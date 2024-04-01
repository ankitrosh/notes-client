import Navbar from "@/components/Navbar";
import { Note } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import NoteStyle from "@/Notes.module.css";

const NoteView = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const created = searchParams.get("created");
  const { noteId } = params;
  const [editable, setEditable] = useState(Boolean(created));
  const navigate = useNavigate();
  const textAreaRef = useRef<HTMLDivElement | null>(null);

  const getNotes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NOTES_SERVER_BASE_URL}/api/notes/${noteId}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };
  const note = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: getNotes,
  });
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm<Note>({});

  useEffect(() => {
    setValue("title", note?.data?.title as string);
    setValue("text", note?.data?.text as string);
  }, [note, setValue]);
  const onSubmit: SubmitHandler<Note> = async (data) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_NOTES_SERVER_BASE_URL}/api/notes/${noteId}`,
        data,
        {
          withCredentials: true,
        }
      );

      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };
  const onDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_NOTES_SERVER_BASE_URL}/api/notes/${noteId}`,
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <form className="w-full h-screen" onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto w-fit md:w-[200px] ">
          <input
            className={clsx({
              "text-center bg-gray-300 font-semibold text-xl rounded-lg md:rounded-b-none":
                !editable,
              "bg-white text-center font-semibold text-xl rounded-lg": editable,
            })}
            disabled={!editable}
            defaultValue={note?.data?.title}
            {...register("title")}
          />
        </div>
        <div>
          {editable ? (
            <div
              contentEditable={editable}
              // className={clsx({ relative: !dragElement })}

              className={clsx({
                "w-[100%] md:w-[1000px] mx-auto md:rounded-3xl h-[800px]  md:p-6 md:border md:border-gray-800 whitespace-pre-line overflow-scroll":
                  true,
              })}
              {...register("text")}
              onInput={(e) => {
                setValue("text", e?.currentTarget?.innerText as string, {
                  shouldValidate: true,
                });
              }}
              ref={textAreaRef}
            >
              {note?.data?.text}
            </div>
          ) : (
            <div className="w-[90%] md:w-[1000px] mx-auto md:rounded-3xl h-[800px] pt-6 md:p-6 md:border md:border-gray-800 overflow-scroll">
              <ReactMarkdown
                className={`${NoteStyle.notes} block prose max-w-full`}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {note?.data?.text}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <div className="fixed w-full bottom-0 bg-gray-500 border-t rounded-t-lg p-6">
          <div className="flex space-between w-full max-w-[1000px] mx-auto gap-2">
            <Button
              className="bg-red-500 mr-auto"
              type="button"
              onClick={() => {
                onDelete();
              }}
            >
              Delete
            </Button>

            <Button
              type="button"
              onClick={() => {
                setEditable(true);
              }}
            >
              Edit
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NoteView;
