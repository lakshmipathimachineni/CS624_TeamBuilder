import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

const StudentInfoPage = ({ route }) => {
  const [students, setStudents] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    id: '',
    country: '',
    experience: '',
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
      studentInfo.country &&
      studentInfo.experience
    ) {
      setStudents((prevStudents) => [...prevStudents, studentInfo]);
      setStudentInfo({
        name: '',
        email: '',
        id: '',
        country: '',
        experience: '',
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
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={studentInfo.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Name"
          />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={studentInfo.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="Email"
          />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>ID</Text>
          <TextInput
            style={styles.input}
            value={studentInfo.id}
            onChangeText={(text) => handleInputChange('id', text)}
            placeholder="ID"
          />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Country</Text>
          <TextInput
            style={styles.input}
            value={studentInfo.country}
            onChangeText={(text) => handleInputChange('country', text)}
            placeholder="Country"
          />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Experience</Text>
          <TextInput
            style={styles.input}
            value={studentInfo.experience}
            onChangeText={(text) => handleInputChange('experience', text)}
            placeholder="Experience"
          />
        </View>
        <Button title="Add Student Info" onPress={addStudentInfo} />
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
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    flex: 1,
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
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

export default StudentInfoPage;
