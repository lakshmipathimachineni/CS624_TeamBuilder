import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';
import XLSX from 'xlsx';
import { DocumentPicker } from 'expo-document-picker'; // Import the DocumentPicker


import { styles } from './styles'; // Import your styles

export default function App() {
  const [students, setStudents] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const handleUploadExcel = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      if (file.type === 'success') {
        const response = await fetch(file.uri);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = async () => {
          const data = new Uint8Array(reader.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          setStudents(jsonData);
        };

        reader.readAsArrayBuffer(blob);
      }
    } catch (error) {
      console.error('Error uploading Excel file', error);
    }
  };

  // ... rest of your code ...

  return (
    <View style={styles.container}>
      <Text>Course Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCourseName(text)}
        value={courseName}
      />
      <Text>Instructor:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setInstructor(text)}
        value={instructor}
      />
      <Button title="Upload Excel" onPress={handleUploadExcel} />
      <ScrollView style={styles.studentsList}>
        {students.map((student, index) => (
          <View key={index} style={styles.studentContainer}>
            <Text style={styles.studentText}>Student ID: {student.StudentID}</Text>
            <Text style={styles.studentText}>Student Name: {student.StudentName}</Text>
            <Text style={styles.studentText}>Student Email: {student.StudentEmail}</Text>
            <Text style={styles.studentText}>Course Name: {courseName}</Text>
            <Text style={styles.studentText}>Country: {student.Country}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
