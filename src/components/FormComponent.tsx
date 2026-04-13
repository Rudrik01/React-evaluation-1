import { useState } from "react";
import React from "react";
export default function FormComponent() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();

      if (tags.includes(inputTag)) {
        setError("Duplicate tag");
      } else if (tags.length >= 10) {
        setError("Maximum 10 tags allowed");
      } else {
        setTags((prev) => [...prev, inputTag]);
        setInputTag("");
        setError("");
      }
    }
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div>
        {tags.map((tag, index) => (
          <span key={index}>
            {tag}{" "}
            <button
              onClick={() => removeTag(index)}
              style={{ marginLeft: "5px" }}>
              X
            </button>
          </span>
        ))}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label htmlFor="tag">
        Enter the skills:
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputTag}
          required
        />
      </label>
    </>
  );
}
