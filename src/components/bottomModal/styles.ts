
import { StyleSheet } from 'react-native';
import {color} from '../../utils';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: '90%',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  handleBar: {
    height: 5,
    width: 50,
    backgroundColor: color.LIGHT_GREY,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  closeButtonText: {
    color: color.BLACK,
    fontWeight: 'bold',
  },
  header: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 100,
  },
  headerText: {
    fontSize: 19,
    color: color.TRICORN_BLACK,
    fontWeight: '700',
  },
  AddText: {
    color: color.LIGHT_SHŌJIN_BLUE,
    fontFamily: '600',
    fontSize: 18,
  },
  separator: {
    borderBottomColor: color.CYAN_BLUE,
    borderBottomWidth: 1,
  },
  containerInput: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    backgroundColor: color.BLEACHED_SILK,
    borderBottomWidth: 1,
    borderBottomColor: color.LIGHT_GREY,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: color.LIGHT_SHŌJIN_BLUE,
    padding: 10,
  },
  error: {
    color: color.RED,
    marginBottom: 8,
  },
  successModal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.WHITE,
    padding: 20,
    borderRadius: 10,
  },

  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  closeSuccessModal: {
    color: color.LIGHT_SHŌJIN_BLUE,
    fontSize: 16,
  },
});

export default styles;
