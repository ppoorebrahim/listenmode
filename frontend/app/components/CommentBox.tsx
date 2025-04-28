"use client";

import { useState } from "react";
import Image from "next/image";
import { SendHorizonal } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
  replies: Comment[];
}

export default function CommentBox() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Ali R.",
      text: "Amazing discussion! Really loved the insights.",
      date: "2h ago",
      replies: [
        {
          id: 11,
          name: "Sara M.",
          text: "Totally agree with you!",
          date: "1h ago",
          replies: [
            //  {
              //  id: 111,
              // این آیتم (John D.) باید کامل حذف شود
              //  text: "Me too!",
              //  date: "45m ago",
              //  replies: []
            //  }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Sara M.",
      text: "Excited to see where AI is heading.",
      date: "1h ago",
      replies: []
    }
  ]);

  const [activeReply, setActiveReply] = useState<{ parentId: number; text: string } | null>(null);
  const [newComment, setNewComment] = useState("");

  const getCurrentTime = () => "Just now";

  const addComment = () => {
    if (!newComment.trim()) return;
    const newItem: Comment = {
      id: Date.now(),
      name: "You",
      text: newComment,
      date: getCurrentTime(),
      replies: []
    };
    setComments([newItem, ...comments]);
    setNewComment("");
  };

  const addReply = (parentId: number) => {
    if (!activeReply?.text.trim()) return;

    const insertReply = (list: Comment[]): Comment[] =>
      list.map(item => {
        if (item.id === parentId) {
          return { ...item, replies: [...item.replies, { id: Date.now(), name: "You", text: activeReply.text, date: getCurrentTime(), replies: [] }] };
        } else if (item.replies.length > 0) {
          return { ...item, replies: insertReply(item.replies) };
        }
        return item;
      });

    setComments(prev => insertReply(prev));
    setActiveReply(null);
  };

  const renderComments = (list: Comment[], level = 0) => (
    list.map(comment => (
      <div key={comment.id} className={`flex flex-col gap-2 ${level === 0 ? "hover:bg-[#3A3A3A]" : "ml-6"} bg-[#1A1A1A] p-3 rounded-lg`}>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-black">
            <Image src="/placeholder.svg" alt="User avatar" width={36} height={36} />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-sm text-[#F5F5F5]">{comment.name}</div>
              <div className="text-xs text-gray-400">{comment.date}</div>
            </div>
            <p className="text-xs font-light text-gray-300 mt-1">{comment.text}</p>
            <button
              onClick={() => setActiveReply({ parentId: comment.id, text: "" })}
              className="text-xs text-[#4639B3] hover:opacity-80 w-max mt-1"
            >
              Reply
            </button>
            {activeReply?.parentId === comment.id && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={activeReply.text}
                  onChange={(e) => setActiveReply({ ...activeReply, text: e.target.value })}
                  className="flex-1 bg-transparent text-xs text-white placeholder:text-gray-500 border border-[#343434] rounded-md px-2 py-1 focus:outline-none"
                />
                <button
                  onClick={() => addReply(comment.id)}
                  className="text-white hover:opacity-80"
                >
                  <SendHorizonal size={16} color="currentColor" />
                </button>
                <button
                  onClick={() => setActiveReply(null)}
                  className="text-xs text-[#F5F5F5] hover:opacity-80"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        {comment.replies.length > 0 && renderComments(comment.replies, level + 1)}
      </div>
    ))
  );

  return (
      <div className="flex flex-col gap-2 md:gap-3 w-full md:w-[896px] bg-[#1A1A1A] p-2 md:p-3 rounded-lg">
      {/* New Comment Input */}
      <div className="flex items-start gap-2 md:gap-3 w-full hover:bg-[#3A3A3A] p-2 rounded-lg bg-[#1A1A1A]">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-black">
          <Image src="/placeholder.svg" alt="User avatar" width={36} height={36} />
        </div>
        <div className="flex flex-1 items-center border border-[#343434] rounded-md px-3 py-2 bg-[#272727]">
        <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
          />
          <button
            onClick={addComment}
            disabled={!newComment.trim()}
            className="text-white hover:opacity-80 disabled:opacity-30"
          >
            <SendHorizonal size={18} color="currentColor" />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-[#272727] p-1 rounded-lg flex flex-col gap-2">
        {comments.length === 0 ? (
          <div className="text-center text-sm text-gray-400">No comments yet. Be the first to share your thoughts!</div>
        ) : (
          renderComments(comments)
        )}
      </div>
    </div>
  );
}
