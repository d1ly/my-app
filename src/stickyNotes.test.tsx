import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes"; 

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

 test("count all notes", () => {
  render(<StickyNotes />);
  const noteCount = screen.getAllByText(/test note /i);
  // accounting for both title and content containing the text "test note"
  // there is still 6 sticky notes.
  expect(noteCount.length).toBe(12);
 });
});

describe("Read StickyNote", () => {
  test("multiple notes test", () => {
    render(<StickyNotes />);

    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    // creating multiple notes and displaying it 

    fireEvent.change(titleInput, { target: { value: "test title 1" } });
    fireEvent.change(contentInput, { target: { value: "content test 1" } });
    fireEvent.click(createButton);

    fireEvent.change(titleInput, { target: { value: "test title 2" } });
    fireEvent.change(contentInput, { target: { value: "content test 2" } });
    fireEvent.click(createButton);

    
    const newNoteTitle = screen.getByText("test title 1");
    const newNoteContent = screen.getByText("content test 1");
    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();

    const newNoteTitle2 = screen.getByText("test title 2");
    const newNoteContent2 = screen.getByText("content test 2");
    expect(newNoteTitle2).toBeInTheDocument();
    expect(newNoteContent2).toBeInTheDocument();
  });

  test("duplicate notes test", () => {
    render(<StickyNotes />);

    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    // creating multiple notes and displaying it 

    fireEvent.change(titleInput, { target: { value: "same title" } });
    fireEvent.change(contentInput, { target: { value: "same content" } });
    fireEvent.click(createButton);

    fireEvent.change(titleInput, { target: { value: "same title" } });
    fireEvent.change(contentInput, { target: { value: "same content" } });
    fireEvent.click(createButton);
    
    const newNoteTitle = screen.getAllByText("same title");
    const newNoteContent = screen.getAllByText("same content");

    expect(newNoteTitle.length).toBe(2);
    expect(newNoteContent.length).toBe(2);
  });

  test("empty note test", () => {
    render(<StickyNotes />);

    const createButton = screen.getByText("Create Note");

    // creates empty note by clicking on Submit without input

    fireEvent.click(createButton);

    const newNoteTitle = screen.queryByText("Note Title");
    const newNoteContent = screen.queryByText("Note Content");

    expect(newNoteTitle).not.toBeInTheDocument();
    expect(newNoteContent).not.toBeInTheDocument();
  });
 });

describe("Update StickyNote", () => {
  test("updating note test", () => {
    render(<StickyNotes />);

    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "test title 1" } });
    fireEvent.change(contentInput, { target: { value: "content test 1" } });
    fireEvent.click(createButton);

    const noteTitle = screen.getByTestId("note-title-1");
    const noteContent = screen.getByTestId("note-content-1");
    fireEvent.blur(noteTitle, { target: { innerHTML: "Updated title" } });
    fireEvent.blur(noteContent, { target: { innerHTML: "Updated content" } });

    expect(noteTitle.textContent).toBe("Updated title");
    expect(noteContent.textContent).toBe("Updated content");
  });

  test("updating content to empty test", () => {
    render(<StickyNotes />);

    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "test title 1" } });
    fireEvent.change(contentInput, { target: { value: "content test 1" } });
    fireEvent.click(createButton);

    const noteTitle = screen.getByTestId("note-title-1");
    const noteContent = screen.getByTestId("note-content-1");
    fireEvent.blur(noteTitle, { target: { innerHTML: "" } });
    fireEvent.blur(noteContent, { target: { innerHTML: "" } });

    const newNoteTitle = screen.queryByText("Empty");
    const newNoteContent = screen.queryByText("Empty");

    expect(newNoteTitle).not.toBeInTheDocument();
    expect(newNoteContent).not.toBeInTheDocument();
  });

});

describe("Delete StickyNote", () => {
  test("deleting a note test", () => {
    render(<StickyNotes />);

    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "test title 1" } });
    fireEvent.change(contentInput, { target: { value: "content test 1" } });
    fireEvent.click(createButton);

    // check if note created
    expect(screen.getByText('test title 1')).toBeInTheDocument();

    // six dummy notes were created, so delete the seventh
    const deleteButton = screen.getByTestId("delete-note-7");
    fireEvent.click(deleteButton);

    expect(screen.queryByText('test title 1')).not.toBeInTheDocument();
  });

  test("deleting one of duplicate notes", () => {
    render(<StickyNotes />);

    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentInput = screen.getByPlaceholderText("Note Content");
    const createButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "same title" } });
    fireEvent.change(contentInput, { target: { value: "same content" } });
    fireEvent.click(createButton);

    fireEvent.change(titleInput, { target: { value: "same title" } });
    fireEvent.change(contentInput, { target: { value: "same content" } });
    fireEvent.click(createButton);
    
    const newNoteTitle = screen.getAllByText("same title");
    const newNoteContent = screen.getAllByText("same content");

    expect(newNoteTitle.length).toBe(2);
    expect(newNoteContent.length).toBe(2);

    const deleteButton = screen.getByTestId("delete-note-7");
    fireEvent.click(deleteButton);

    expect(screen.getAllByText("same content").length).toBe(1);
  });

});