import React from 'react';

const FileLink = ({ filePath, sopTitle }) => {
  // Replace 'C:\\Uploads\\' with an empty string and ensure forward slashes are used
  const cleanedFilePath = filePath?.replace(/C:\\fakepath\\/, '').replace(/\\/g, '/');
  const fileUrl = `http://localhost:8081/${cleanedFilePath}`;

  return (
    <td>
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        {sopTitle}
      </a>
    </td>
  );
};

export default FileLink;
