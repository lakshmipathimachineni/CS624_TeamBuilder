import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

const App = () => {
  const [students, setStudents] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    id: '',
    country: '',
  });
  const [formedTeams, setFormedTeams] = useState([]);

  const handleInputChange = (name, value) => {
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const addStudentInfo = () => {
    if (
      studentInfo.name &&
      studentInfo.email &&
      studentInfo.id &&
      studentInfo.country
    ) {
      setStudents((prevStudents) => [...prevStudents, studentInfo]);
      setStudentInfo({
        name: '',
        email: '',
        id: '',
        country: '',
      });
    } else {
      alert('Please fill in all details.');
    }
  };

  const formTeams = () => {
    const teams = [];
    const countriesUsed = new Set();

    students.forEach((student) => {
      if (!countriesUsed.has(student.country)) {
        countriesUsed.add(student.country);

        const team = [];
        team.push(student);

        const otherCountries = Array.from(countriesUsed.values()).filter(
          (country) => country !== student.country
        );

        otherCountries.forEach((country) => {
          const studentFromOtherCountry = students.find(
            (s) => s.country === country && !team.includes(s)
          );

          if (studentFromOtherCountry) {
            team.push(studentFromOtherCountry);
            countriesUsed.add(country);
          }
        });

        if (team.length >= 2) {
          teams.push(team);
        }
      }
    });

    setFormedTeams(teams);
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Email</Text>
          <Text style={styles.headerText}>ID</Text>
          <Text style={styles.headerText}>Country</Text>
        </View>
        {students.map((student, index) => (
          <View key={index} style={styles.studentRow}>
            <Text style={styles.studentText}>{student.name}</Text>
            <Text style={styles.studentText}>{student.email}</Text>
            <Text style={styles.studentText}>{student.id}</Text>
            <Text style={styles.studentText}>{student.country}</Text>
          </View>
        ))}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={studentInfo.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={studentInfo.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={studentInfo.id}
            onChangeText={(text) => handleInputChange('id', text)}
            placeholder="ID"
          />
          <TextInput
            style={styles.input}
            value={studentInfo.country}
            onChangeText={(text) => handleInputChange('country', text)}
            placeholder="Country"
          />
          <Button title="Add Student Info" onPress={addStudentInfo} />
        </View>
        <Button title="Team Formation" onPress={formTeams} />
        <View>
          <Text style={styles.teamHeader}>Formed Teams:</Text>
          {formedTeams.map((team, teamIndex) => (
            <View key={teamIndex} style={styles.teamContainer}>
              <Text style={styles.teamText}>{`Team ${teamIndex + 1}:`}</Text>
              {team.map((teamMember, memberIndex) => (
                <Text key={memberIndex} style={styles.teamText}>{`${teamMember.name} (${teamMember.country})`}</Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  studentText: {
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  teamHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamContainer: {
    marginBottom: 10,
  },
  teamText: {
    fontSize: 16,
  },
});

export default App;
