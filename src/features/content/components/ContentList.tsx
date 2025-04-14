import { getContentList } from "../content-api";
import ContentListTile from "./ContentListTile";

async function ContentList() {
  const contents = await getContentList();

  return (
    <>
      <div className="w-[240px]">
        {contents.map((content) => (
          <ContentListTile key={content.id} content={content} />
        ))}
      </div>
    </>
  );
}

export default ContentList;
