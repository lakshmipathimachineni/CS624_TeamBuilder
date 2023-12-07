import { Alert, ScrollView, Text, TextInput, View, Button, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useAppContext } from './AppContext';

const StudentInfoPage = ({ route }) => {
  const { state, dispatch } = useAppContext();
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    id: '',
    country: '',
    experience: '',
  });
  const [formedTeams, setFormedTeams] = useState([]);
  const [displayedTeams, setDisplayedTeams] = useState(false);
  const [displayStudentsList, setDisplayStudentsList] = useState(false);

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
      const isIdTaken = state.students.some((student) => student.id === studentInfo.id);

      if (isIdTaken) {
        Alert.alert('Student ID is already taken. Please choose a unique ID.');
      } else {
        dispatch({ type: 'ADD_STUDENT', payload: studentInfo });
        setStudentInfo({
          name: '',
          email: '',
          id: '',
          country: '',
          experience: '',
        });
      }
    } else {
      Alert.alert('Please fill in all details.');
    }
  };

  const formTeams = () => {
    const teams = [];
    const studentsAssigned = new Set();
  
    state.students.forEach((student) => {
      if (!studentsAssigned.has(student.id)) {
        const team = [];
        team.push(student);
        studentsAssigned.add(student.id);
  
        const otherStudents = state.students.filter(
          (s) => !studentsAssigned.has(s.id)
        );
  
        otherStudents.forEach((otherStudent) => {
          if (team.length < 2 && otherStudent.country !== student.country) {
            team.push(otherStudent);
            studentsAssigned.add(otherStudent.id);
          }
        });
  
        teams.push(team);
      }
    });
  
    setFormedTeams(teams);
    dispatch({ type: 'FORM_TEAMS', payload: teams });
  
    Alert.alert('Team Formation Completed', 'The teams have been successfully formed!');
  };

  const getTeamDetails = () => {
    if (formedTeams.length > 0) {
      setDisplayedTeams(true);
    } else {
      Alert.alert('Teams Not Formed', 'Please form teams before getting team details.');
    }
  };

  const getStudentsList = () => {
    setDisplayStudentsList(true);
  };

  return (
    <ScrollView>
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
          <View style={styles.buttonRow}>
            <Button title="Add Student Info" onPress={addStudentInfo} style={styles.button} />
            <Button title="Team Formation" onPress={formTeams} style={styles.button} />
            <Button title="Get Team Details" onPress={getTeamDetails} style={styles.button} />
            <Button title="Students List" onPress={getStudentsList} style={styles.button} />
          </View>

          {displayStudentsList && (
            <View>
              <Text style={styles.teamHeader}>Students List:</Text>
              {state.students.map((student, index) => (
                <View key={index} style={styles.teamContainer}>
                  <Text style={styles.teamText}>{`Name: ${student.name}`}</Text>
                  <Text style={styles.teamText}>{`Email: ${student.email}`}</Text>
                  <Text style={styles.teamText}>{`ID: ${student.id}`}</Text>
                  <Text style={styles.teamText}>{`Country: ${student.country}`}</Text>
                  <Text style={styles.teamText}>{`Experience: ${student.experience}`}</Text>
                </View>
              ))}
            </View>
          )}

          <View>
            <Text style={styles.teamHeader}>Formed Teams:</Text>
            {displayedTeams &&
              formedTeams.map((team, teamIndex) => (
                <View key={teamIndex} style={styles.teamContainer}>
                  <Text style={styles.teamText}>{`Team ${teamIndex + 1}:`}</Text>
                  {team.map((teamMember, memberIndex) => (
                    <Text
                      key={memberIndex}
                      style={styles.teamText}
                    >{`${teamMember.name} (${teamMember.country})`}</Text>
                  ))}
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Adjusted padding for better spacing
    backgroundColor: '#fff',
    justifyContent: 'center', // Center content vertically
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 1,
    marginStart: 5,
    flex: 1,
    minWidth: 80, // Set a minimum width for better alignment
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    paddingHorizontal: 10,
    minWidth: 200, // Set a minimum width for better alignment
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  teamHeader: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamContainer: {
    marginBottom: 10,
  },
  button: {
    marginRight: 10, // Adjust the value based on your preference
  },
  teamText: {
    fontSize: 16,
  },
});

export default StudentInfoPage;
