import React, { useReducer, useRef, useState } from "react";
// components >
import { MenuBox } from "../../common";
import { InputLink, HeadingTag } from "./components";
// icon =========== >
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import AddLinkRoundedIcon from "@mui/icons-material/AddLinkRounded";
import LinkOffRoundedIcon from "@mui/icons-material/LinkOffRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// css ======== >
import "./tiptap.css";
import { MuiButton } from "../../ui";
// cases name to quick acsses .
const cases = {
  dropdown: "DROPDOWN",
};
// one of properties in actions is (dropDown) has properties in this object
const dropDownNames = {
  linkDropDown: "linkDropDown",
  headingTagDropDown: "headingTagDropDown",
  imageDropDown: "imageDropDown",
};

export default  function Options({ editor }) {
 
  
  // states == >
  const [linkValue, setLinkValue] = useState("");
  const [currentHeadingTag, setCurrentHeadingTag] = useState("0");
  // ref ==== >>
  const inputImageRef = useRef(null);
  // useReducer == >
  const [states, dispatch] = useReducer(
    (state, action) => {
      switch (action?.type) {
        case cases.dropdown: {
          return {
            ...state,
            actions: {
              ...state.actions,
              dropDowns: {
                [action.peyload.dropDownName]: action.peyload.value,
              },
            },
          };
        }
      }
    },
    {
      actions: {
        dropDowns: {
          [dropDownNames.linkDropDown]: false,
          [dropDownNames.headingTagDropDown]: false,
          [dropDownNames.imageDropDown]: false,
        },
      },
    }
  );
  // _______________________________Functions________________________________________
  // Link ===== >>
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    // input url
    setLinkValue(previousUrl || "");
    const url = linkValue;

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e.message);
    }
  };
  const unsetLink = () => editor.chain().focus().unsetLink().run();
  // Bold === >>
  const setBlod = () => {
    editor.chain().focus().toggleBold().run();
  };
  // Italic === >>
  const setItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };
  // Head line level === >>
  const setHeadingLevel = (level) => {
    const IntLevel = parseInt(level);
    if (IntLevel == 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: IntLevel }).run();
    }
  };
  // image === >>
  const onUploadImag = () => {};
  // _______________________________Finish-Functions________________________________________

  return (
    // NOTIC ! these spans have styled like this .tools-wrapper span  so if you change them you have to change css file  .
    <>
      {/* Bold */}
      <span
        className={`${editor?.isActive("bold") ? "op-active" : ""}`}
        onClick={setBlod}
      >
        <FormatBoldRoundedIcon />
      </span>
      {/* italic */}
      <span
        className={`${editor?.isActive("italic") ? "op-active" : ""}`}
        onClick={setItalic}
      >
        <FormatItalicRoundedIcon />
      </span>
      {/* Link Creator */}
      <span
        className={`has-popup ${
          states.actions.dropDowns[dropDownNames.linkDropDown]
            ? "op-active"
            : ""
        }`}
        onClick={() => {
          setLink(); // calld to update url input set prevous link
          dispatch({
            type: cases.dropdown,
            peyload: {
              dropDownName: dropDownNames.linkDropDown,
              // to toggle open/close
              value: !states.actions.dropDowns[dropDownNames.linkDropDown],
            },
          });
        }}
      >
        {/* DropDownInput to create a link at editor  */}
        {states.actions.dropDowns[dropDownNames.linkDropDown] && (
          <MenuBox className={"popup"} zIndex={5} backCover={false}>
            <InputLink
              onChange={(e) => setLinkValue(e.target.value)}
              value={linkValue}
              onSubmit={() => {
                setLink();
                // close dropdown >
                dispatch({
                  type: cases.dropdown,
                  peyload: {
                    value: false, // colse dropdown
                    dropDownName: dropDownNames.linkDropDown,
                  },
                });
              }}
            />
          </MenuBox>
        )}
        <AddLinkRoundedIcon />
      </span>
      {/* Unset Link */}
      <span
        className={`${editor?.isActive("link") ? "op-active" : ""}`}
        onClick={unsetLink}
      >
        <LinkOffRoundedIcon />
      </span>
      {/* Chosse Tag -> h1,h2,h3,h4,h5,h6 */}
      <span
        className={`has-popup ${
          states.actions.dropDowns[dropDownNames.headingTagDropDown]
            ? "op-active"
            : ""
        }
 
        ${editor?.isActive("heading") ? "op-active" : ""}
        `}
        onClick={() => {
          dispatch({
            // to toggle open/close
            type: cases.dropdown,
            peyload: {
              dropDownName: dropDownNames.headingTagDropDown,
              value:
                !states.actions.dropDowns[dropDownNames.headingTagDropDown],
            },
          });
        }}
      >
        {/* DropDownInput to create a link at editor  */}
        {states.actions.dropDowns[dropDownNames.headingTagDropDown] && (
          <MenuBox
            width="fit-content"
            className={"popup"}
            zIndex={5}
            backCover={false}
          >
            <div className="popup-child-wrapper">
              <HeadingTag
                maxLevel={6}
                onChange={(value) => {
                  setCurrentHeadingTag((prev) => (value == prev ? 0 : value)); // set hedingLevel to state
                  setHeadingLevel(value); // set hedingLevel to setHeadingLevel
                  dispatch({
                    type: cases.dropdown,
                    peyload: {
                      value: false, // close dropDown
                      dropDownName: dropDownNames.headingTagDropDown, // <-  which dropDown ?
                    },
                  });
                }}
                value={currentHeadingTag}
              />
            </div>
          </MenuBox>
        )}
        {currentHeadingTag == 0 ? "?h" : `h${currentHeadingTag}`}
      </span>
      {/* Image uploader */}
      <span
        className={`has-popup ${
          states.actions.dropDowns[dropDownNames.imageDropDown]
            ? "op-active"
            : ""
        }
 
        ${editor?.isActive("image") ? "op-active" : ""}
        `}
        onClick={() => {
          dispatch({
            // to toggle open/close
            type: cases.dropdown,
            peyload: {
              dropDownName: dropDownNames.imageDropDown,
              value: !states.actions.dropDowns[dropDownNames.imageDropDown],
            },
          });
        }}
      >
        {/* DropDownInput to create a link at editor  */}
        {states.actions.dropDowns[dropDownNames.imageDropDown] && (
          <MenuBox
            width="fit-content"
            className={"popup"}
            zIndex={5}
            backCover={false}
          >
            <div className="popup-child-wrapper">
              <input
                ref={inputImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const base64 = reader.result;
                    if (typeof base64 === "string") {
                      editor?.chain().focus()?.setImage({ src: base64 }).run();
                    }
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <MuiButton
                className="!flex"
                variant={"contained"}
                onClick={() => inputImageRef?.current.click()}
              >
                <p className="text-nowrap">اپلود تصویر</p>
              </MuiButton>
            </div>
          </MenuBox>
        )}
        <AddPhotoAlternateIcon />
      </span>

    </>
  );
}
