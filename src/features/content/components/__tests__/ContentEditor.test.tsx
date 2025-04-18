import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import ContentEditor from "../ContentEditor";
import { saveContentAction } from "../../actions";
import "@testing-library/jest-dom";
import { toast } from "sonner";

// モックの設定
jest.mock("../../actions", () => ({
  saveContentAction: jest.fn(),
}));

// useRouterのモックを修正
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

// sonnerのモック
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// このテストスイートの前に毎回実行される
beforeEach(() => {
  // モックをリセット
  jest.clearAllMocks();
});

describe("ContentEditor", () => {
  // 新規作成モードのテスト
  describe("新規作成モード", () => {
    test("初期状態ではタイトル入力フォームが表示されている", () => {
      render(<ContentEditor />);

      // 名前で検索する代わりにidで検索する
      const titleInput = screen.getByRole("textbox", { name: "" });
      // または単にgetByRoleだけで最初のtextboxを取得
      // const titleInput = screen.getByRole("textbox");
      expect(titleInput).toBeInTheDocument();
      expect(titleInput).toHaveAttribute("id", "title");

      // 保存ボタンとキャンセルボタンも表示されている
      const saveButton = screen.getByText("Save");
      const cancelButton = screen.getByText("Cancel");
      expect(saveButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test("タイトルを入力して保存すると、saveContentActionが呼ばれる", async () => {
      const user = userEvent.setup();

      // APIのモックレスポンスを設定
      (saveContentAction as jest.Mock).mockResolvedValue({
        success: true,
        content: { id: 123, title: "テストタイトル", body: "" },
      });

      render(<ContentEditor />);

      // タイトルを入力
      const titleInput = screen.getByRole("textbox");
      await user.clear(titleInput);
      await user.type(titleInput, "テストタイトル");

      // 保存ボタンをクリック
      const saveButton = screen.getByText("Save");
      await user.click(saveButton);

      // APIが正しいパラメータで呼ばれたことを確認
      await waitFor(() => {
        expect(saveContentAction).toHaveBeenCalledWith({
          content: {
            title: "テストタイトル",
            body: "",
          },
          currentContent: undefined,
        });
      });

      // 保存成功後、新しいページに遷移したことを確認
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/content/123");
      });
    });
  });

  // 編集モードのテスト
  describe("編集モード", () => {
    const mockContent = {
      id: 123,
      title: "既存タイトル",
      body: "これは10文字以上の既存の本文テストデータです",
    };

    test("初期状態ではタイトルが表示されている（編集モードではない）", () => {
      render(<ContentEditor content={mockContent} />);

      // タイトルが表示されている
      expect(screen.getByText("既存タイトル")).toBeInTheDocument();
      // 本文が表示されている
      expect(
        screen.getByText("これは10文字以上の既存の本文テストデータです"),
      ).toBeInTheDocument();

      // 編集ボタンが表示されている
      const editButtons = screen.getAllByText("Edit");
      expect(editButtons.length).toBeGreaterThanOrEqual(1);
    });

    test("編集ボタンをクリックするとタイトル編集モードになる", async () => {
      const user = userEvent.setup();
      render(<ContentEditor content={mockContent} />);

      // 編集ボタンをクリック
      const editButtons = screen.getAllByText("Edit");
      await user.click(editButtons[0]); // タイトル編集ボタン

      // タイトル入力フィールドが表示される
      const titleInput = screen.getByRole("textbox");
      expect(titleInput).toBeInTheDocument();
      expect(titleInput).toHaveValue("既存タイトル");

      // 保存ボタンとキャンセルボタンが表示される
      expect(screen.getAllByText("Save")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Cancel")[0]).toBeInTheDocument();
    });

    test("タイトルを編集して保存すると、saveContentActionが呼ばれる", async () => {
      const user = userEvent.setup();

      // APIのモックレスポンスを設定
      (saveContentAction as jest.Mock).mockResolvedValue({
        success: true,
        content: {
          id: 123,
          title: "更新されたタイトル",
          body: "これは10文字以上の既存の本文テストデータです",
        },
      });

      render(<ContentEditor content={mockContent} />);

      // 編集ボタンをクリック
      const editButtons = screen.getAllByText("Edit");
      await user.click(editButtons[0]); // タイトル編集ボタン

      // タイトルを編集
      const titleInput = screen.getByRole("textbox");
      await user.clear(titleInput);
      await user.type(titleInput, "更新されたタイトル");

      // 保存ボタンをクリック
      const saveButton = screen.getByText("Save");
      await user.click(saveButton);

      // APIが正しいパラメータで呼ばれたことを確認
      await waitFor(() => {
        expect(saveContentAction).toHaveBeenCalledWith({
          content: {
            title: "更新されたタイトル",
            body: "これは10文字以上の既存の本文テストデータです",
          },
          currentContent: mockContent,
        });
      });
    });

    test("キャンセルボタンをクリックすると編集モードが終了する", async () => {
      const user = userEvent.setup();
      render(<ContentEditor content={mockContent} />);

      // 編集ボタンをクリック
      const editButtons = screen.getAllByText("Edit");
      await user.click(editButtons[0]); // タイトル編集ボタン

      // タイトル入力フィールドが表示される
      const titleInput = screen.getByRole("textbox");
      expect(titleInput).toBeInTheDocument();

      // タイトルを編集
      await user.clear(titleInput);
      await user.type(titleInput, "更新しようとしたタイトル");

      // キャンセルボタンをクリック
      const cancelButton = screen.getAllByText("Cancel")[0];
      await user.click(cancelButton);

      // 表示モードに戻り、元のタイトルが表示されていることを確認
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
      expect(screen.getByText("既存タイトル")).toBeInTheDocument();

      // APIが呼ばれていないことを確認
      expect(saveContentAction).not.toHaveBeenCalled();
    });
  });

  // バリデーションのテスト
  describe("バリデーション", () => {
    test("タイトルが空の場合はバリデーションエラーが表示され保存されない", async () => {
      const user = userEvent.setup();

      render(<ContentEditor />);

      // タイトルを空にする
      const titleInput = screen.getByRole("textbox");
      await user.clear(titleInput);

      // 保存ボタンをクリック
      const saveButton = screen.getByText("Save");
      await user.click(saveButton);

      // エラートーストが表示されることを確認
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });

      // APIが呼ばれていないことを確認
      expect(saveContentAction).not.toHaveBeenCalled();
    });

    test("タイトルが50文字を超える場合はバリデーションエラーが表示され保存されない", async () => {
      const user = userEvent.setup();

      render(<ContentEditor />);

      // 50文字を超えるタイトルを入力
      const titleInput = screen.getByRole("textbox");
      await user.clear(titleInput);
      const longTitle = "あ".repeat(51); // 51文字
      await user.type(titleInput, longTitle);

      // 保存ボタンをクリック
      const saveButton = screen.getByText("Save");
      await user.click(saveButton);

      // エラートーストが表示されることを確認
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });

      // APIが呼ばれていないことを確認
      expect(saveContentAction).not.toHaveBeenCalled();
    });

    test("本文が10文字未満の場合はバリデーションエラーが表示され保存されない", async () => {
      const user = userEvent.setup();

      // モックコンテンツを作成
      const testContent = {
        id: 456,
        title: "テストタイトル",
        body: "これは10文字以上の本文です",
      };

      render(<ContentEditor content={testContent} />);

      // 本文編集ボタンをクリック
      const editButtons = screen.getAllByText("Edit");
      await user.click(editButtons[1]); // 本文編集ボタン

      // 10文字未満の本文を入力
      const bodyTextarea = screen.getByRole("textbox");
      await user.clear(bodyTextarea);
      await user.type(bodyTextarea, "短い本文"); // 4文字

      // 保存ボタンをクリック
      const saveButton = screen.getByText("Save");
      await user.click(saveButton);

      // エラートーストが表示されることを確認
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });

      // APIが呼ばれていないことを確認
      expect(saveContentAction).not.toHaveBeenCalled();
    });

    test("本文が1000文字を超える場合はバリデーションエラーが表示され保存されない", async () => {
      const user = userEvent.setup();

      // モックコンテンツを作成
      const testContent = {
        id: 456,
        title: "テストタイトル",
        body: "これは10文字以上の本文です",
      };

      render(<ContentEditor content={testContent} />);

      // 本文編集ボタンをクリック
      const editButtons = screen.getAllByText("Edit");
      await user.click(editButtons[1]); // 本文編集ボタン

      // 1000文字を超える本文を入力
      const bodyTextarea = screen.getByRole("textbox");
      await user.clear(bodyTextarea);
      const longBody = "あ".repeat(1001); // 1001文字
      await user.type(bodyTextarea, longBody);

      // 保存ボタンをクリック
      const saveButton = screen.getByText("Save");
      await user.click(saveButton);

      // エラートーストが表示されることを確認
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });

      // APIが呼ばれていないことを確認
      expect(saveContentAction).not.toHaveBeenCalled();
    });

    test("本文が空でも保存できる", async () => {
      const user = userEvent.setup();

      // APIのモックレスポンスを設定
      (saveContentAction as jest.Mock).mockResolvedValue({
        success: true,
        content: { id: 789, title: "タイトルのみ", body: "" },
      });

      render(<ContentEditor />);

      // タイトルを入力
      const titleInput = screen.getByRole("textbox");
      await user.clear(titleInput);
      await user.type(titleInput, "タイトルのみ");

      // 保存ボタンをクリック
      const saveButton = screen.getByText("Save");
      await user.click(saveButton);

      // APIが正しいパラメータで呼ばれたことを確認
      await waitFor(() => {
        expect(saveContentAction).toHaveBeenCalledWith({
          content: {
            title: "タイトルのみ",
            body: "",
          },
          currentContent: undefined,
        });
      });
    });
  });
});
