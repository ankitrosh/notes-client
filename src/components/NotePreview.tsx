import { Note } from "@/types";
import { format } from "date-fns";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

interface INotePreview {
  note: Note;
}

const NotePreview: React.FC<INotePreview> = ({ note }) => {
  const formattedCreatedAtDate = format(
    new Date(note?.createdAt),
    "yyyy-MM-dd"
  );
  const previewLinesNumber = 4;
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: { duration: 1 },
      }}
      whileTap={{ scale: 0.9 }}
      className="bg-white pb-4 rounded-xl cursor-pointer w-full h-fit border-[3px] border-gray-900"
      onClick={() => {
        navigate(`/${note?._id}`);
      }}
    >
      <div className="flex gap-2 justify-between bg-gray-900 text-white px-3 py-4">
        <h2 className="font-semibold">{note?.title}</h2>
        <p>{formattedCreatedAtDate}</p>
      </div>
      <hr className="border-gray-600 mb-2" />
      <div className="flex lg:w-[300px] px-3">
        {/* <p className="line-clamp-2 underline underline-offset-4 decoration-2 decoration-orange-400 w-full"> */}
        <div className="notes-sidestyle-dotted rounded-full w-6 shrink-0 " />
        <span className="border-r-4 border-r-gray-600 mx-2 -mt-2 -mb-4" />

        <p className={`line-clamp-4 underline-bg w-full`}>
          <ReactMarkdown>{note?.text}</ReactMarkdown>
          {[...Array(previewLinesNumber)].map((e, i) => (
            <br key={i} />
          ))}
        </p>
      </div>
    </motion.div>
  );
};

export default NotePreview;
