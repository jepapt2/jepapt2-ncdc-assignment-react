// jest.setup.js
import "@testing-library/jest-dom";

// 必要に応じてグローバルなモックを設定
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useParams() {
    return {};
  },
}));
