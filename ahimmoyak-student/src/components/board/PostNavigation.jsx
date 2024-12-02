import {NavLink, useParams} from "react-router-dom";

const PostNavigation = ({ prevPost, nextPost }) => {

  const {courseId} = useParams();

  return (
    <div className="border-t border-b border-gray-200 mt-8">
      {prevPost && (
        <NavLink
          to={`/course/${courseId}/${prevPost.type}/${prevPost.id}`}
          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">이전 글</span>
            <span className="text-sm font-medium">{prevPost.title}</span>
          </div>
        </NavLink>
      )}

      {nextPost && (
        <NavLink
          to={`/course/${courseId}/${nextPost.type}/${nextPost.id}`}
          className="flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">다음 글</span>
            <span className="text-sm font-medium">{nextPost.title}</span>
          </div>
        </NavLink>
      )}
    </div>
  );
};
export default PostNavigation;