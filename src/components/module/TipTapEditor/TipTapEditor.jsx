import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
// Editor Tiptap ==========>
import { EditorContent, useEditor } from "@tiptap/react";
// extensions  =================== >
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import History from "@tiptap/extension-history";
import Options from "./Options";
import "./tiptap.css";
// icons == >
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
export default function TipTapEditor({onChange}) {
  // Configuration --- >
  const editor = useEditor({
    content: "",
    extensions: [
      Text,
      Paragraph,
      Document,
      Bold,
      Italic,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        heading: false,
      }),
      Image,
      History,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [];
            const domain = parsedUrl.hostname;
            if (disallowedDomains.includes(domain)) {
              return false;
            }
            // if all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);
            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [];
            const domain = parsedUrl.hostname;
            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      try {
        onChange({ temp: editor.getHTML() });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const undo = useCallback(() => {
    editor.chain().focus().undo().run();
  }, [editor]);
  const redo = useCallback(() => {
    editor.chain().focus().redo().run();
  }, [editor]);

  return (
    <div className="parent">
      <section>
        {/* right-side-tolls */}
        <aside className="right-side">
          <div className="tools-wrapper">
            <Options editor={editor} />
          </div>
        </aside>
        {/* left-side-textarea */}
        <aside className="left-side">
          <div className="text-content-wrapper">
            {editor && <EditorContent editor={editor} />}
            <div className="redo-undo">
              <button type="button" onClick={redo}>
                <RedoRoundedIcon />
              </button>
              <button type="button" onClick={undo}>
                <UndoRoundedIcon />
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
