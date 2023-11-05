import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  studentsList: {
    marginTop: 20,
  },
  studentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  studentText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
