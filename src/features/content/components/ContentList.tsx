import { getContentList } from "../content-api";

async function ContentList() {
  const contents = await getContentList();

  return (
    <>
      <div className="w-[240px]">
        {contents.map((content) => (
          <a href={`/content/${content.id}`} key={content.id}>
            <div className="rounded-sm p-1 text-body hover:bg-light-bg hover:text-brand hover:cursor-pointer hover:font-bold">
              <p>{content.title}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default ContentList;
