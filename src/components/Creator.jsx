import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, PlusCircle, Check, Mail, Link } from "lucide-react";
import emailjs from "@emailjs/browser";

const questionOptions = [
  "Will you forever be mine?",
  "Do you love me?",
  "Will you be my girlfriend?",
  "Will you marry me someday?",
  "Do you want to spend your life with me?",
  "Are you my soulmate?",
  "Will you always stay with me?",
  "Do you promise to love me forever?",
  "Will you say YES to us?",
  "Custom"
];

const Creator = () => {

  const [formData, setFormData] = useState({
  name: "",
  imageFile: null,
  question: "",
  customQuestion: "",
  gridSize: 3,
  shareMethod: "link",
  email: ""
});

  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "gridSize" ? parseInt(value) || 3 : value
      }));
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!formData.imageFile) {
      alert("Please select a photo for the puzzle!");
      return;
    }

    setIsUploading(true);

    try {

      const uploadData = new FormData();
      uploadData.append("image", formData.imageFile);
      uploadData.append("key", import.meta.env.VITE_IMGBB_API_KEY);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: uploadData
      });

      const data = await response.json();

      if (data.success) {

        const uploadedUrl = data.data.url;

        const params = new URLSearchParams();
        params.set("name", formData.name);
        params.set("photo", uploadedUrl);
        const finalQuestion =
        formData.question === "Custom"
          ? formData.customQuestion
          : formData.question;

      params.set("question", finalQuestion);
        params.set("grid", formData.gridSize.toString());

        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

        setGeneratedUrl(url);

        // SEND EMAIL
        if (formData.shareMethod === "email") {

          const templateParams = {
            to_email: formData.email,
            to_name: formData.name,
            puzzle_link: url
          };

          await emailjs.send(
            "service_ktxf7lb",
            "template_bxhyuqp",
            templateParams,
            "ooXP0WWqpRX7LMI0x"
          );

          setEmailSent(true);
        }

      } else {
        alert("Image upload failed.");
      }

    } catch (error) {
      console.error(error);
      alert("Upload error occurred");
    }

    setIsUploading(false);
  };

  const copyToClipboard = () => {

    navigator.clipboard.writeText(generatedUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (

    <div style={containerStyle}>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={cardStyle}
      >

        <h1 style={titleStyle}>Create a Surprise ✨</h1>

        <form onSubmit={handleGenerate} style={formStyle}>

          {/* Name */}

          <div>
            <label style={label}>Their Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* Image */}

          <div>
            <label style={label}>Puzzle Photo</label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* Grid */}

          <div>
            <label style={label}>Puzzle Grid</label>

            <select
              name="gridSize"
              value={formData.gridSize}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="3">9 tiles</option>
              <option value="4">16 tiles</option>
            </select>
          </div>

          {/* Question */}

          <div>
            <label style={label}>Final Question</label>

        <select
          name="question"
          value={formData.question}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select a question</option>
          {questionOptions.map((q, index) => (
            <option key={index} value={q}>
              {q}
            </option>
          ))}
        </select>

        {formData.question === "Custom" && (
          <div style={{ marginTop: 8 }}>

            <input
              type="text"
              name="customQuestion"
              placeholder="Type your question..."
              value={formData.customQuestion}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
              ⚠️ Your question should be a <b>Yes / No question</b>.  
              Example: "Will you be mine forever?"
            </p>

          </div>
        )}  
          </div>

          {/* Share Method */}

          <div>

            <label style={label}>Send Method</label>

            <select
              name="shareMethod"
              value={formData.shareMethod}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="link">Generate Link</option>
              <option value="email">Send via Email</option>
            </select>

          </div>

          {/* Email */}

          {formData.shareMethod === "email" && (

            <div>

              <label style={label}>Recipient Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                style={inputStyle}
                required
              />

            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            style={buttonStyle}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Generate Surprise"}
          </button>

        </form>

        {/* Link Display */}

        {generatedUrl && formData.shareMethod === "link" && (

          <div style={{ marginTop: 20 }}>

            <p style={label}>Your Secret Link</p>

            <div style={{ display: "flex", gap: 10 }}>

              <input
                value={generatedUrl}
                readOnly
                style={{ ...inputStyle, flex: 1 }}
              />

              <button onClick={copyToClipboard} style={copyButton}>

                {copied ? <Check size={18} /> : <Copy size={18} />}

              </button>

            </div>

          </div>

        )}

        {/* Email Sent */}

        {emailSent && (
          <p style={{ marginTop: 20, color: "green" }}>
            Surprise link sent successfully 💌
          </p>
        )}

      </motion.div>

    </div>
  );
};

export default Creator;



const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh"
};

const cardStyle = {
  width: 420,
  padding: 30,
  borderRadius: 12,
  background: "white"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: 20
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 15
};

const label = {
  fontWeight: 600,
  fontSize: 14
};

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc"
};

const buttonStyle = {
  marginTop: 10,
  padding: 12,
  borderRadius: 8,
  border: "none",
  background: "#8b5cf6",
  color: "white",
  cursor: "pointer"
};

const copyButton = {
  border: "none",
  padding: 10,
  borderRadius: 8,
  background: "#8b5cf6",
  color: "white",
  cursor: "pointer"
};