import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const DocumentEditor = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const socket = io('https://real-time-document.onrender.com', {
    auth: {
      token: localStorage.getItem('token')
    }
  });

  useEffect(() => {
    socket.emit('joinDocument', id);

    socket.on('documentUpdated', (document) => {
      setContent(document.content);
    });

    return () => {
      socket.disconnect();
    };
  }, [id, socket]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`https://real-time-document.onrender.com/api/getDocument/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log("response..........", response)
        setContent(response.data.data.content);
      } catch (error) {
        console.error('Failed to fetch document', error);
      }
    };

    fetchDocument();
  }, []);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit('editDocument', id, newContent);
  };

  return (
    <div>
      <h1>Document Editor</h1>
      <textarea value={content} onChange={handleContentChange} rows="10" cols="30" />
    </div>
  );
};

export default DocumentEditor;
