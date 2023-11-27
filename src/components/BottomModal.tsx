import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {ValidationError} from 'yup';
import { useFocusEffect } from '@react-navigation/native';

interface BottomPopupProps {
  isVisible: boolean;
  onClose: () => void;
  createnewMovieRequest: any;
}

const Separator = () => <View style={styles.separator} />;

const BottomPopup: React.FC<BottomPopupProps> = ({
  isVisible,
  onClose,
  createnewMovieRequest,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const data = useSelector((state: any) => state.Lists);
  const [nameError, setNameError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [refresh, setRefresh] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
  });
  const call = () => {
    const values = {name, description};
    try {
      validationSchema.validateSync(values, {abortEarly: false});

      const payload = {
        name: name.trim(),
        description: description.trim(),
        language: 'en',
      };
      dispatch(createnewMovieRequest(payload));
      setRefresh(true);
      setName('');
      setDescription('');
      //setShowSuccessModal(true);
    } catch (validationError) {
      if (validationError instanceof ValidationError) {
        validationError.inner.forEach(error => {
          if (error.path === 'name') {
            setNameError(error.message);
          }
          if (error.path === 'description') {
            setDescriptionError(error.message);
          }
        });
      }
    }
  };
  useEffect(() => {
    if (refresh && data?.createdMovieList?.isSuccess) {
    
     console.log(refresh, data?.createdMovieList?.isSuccess,"kklklklklklklk:::::::::::::::::::::::::::::::::::::::::::::::::::::" );
     setRefresh(false);
     setShowSuccessModal(true);

    }
  }, [refresh,  data?.createdMovieList?.isSuccess,setRefresh]);


  console.log( data?.createdMovieList);


  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}>
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            onPress={onClose}
            style={styles.handleBar}></TouchableOpacity>
        </ScrollView>
        <View style={{position: 'absolute', width: '100%', marginTop: 10}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.AddText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Create list</Text>
          </View>
          <Separator />
          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={text => {
                setName(text);
                setNameError('');
              }}
            />

            {nameError && <Text style={styles.error}>{nameError}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={text => {
                setDescription(text);
                setDescriptionError('');
              }}
            />
            {descriptionError && (
              <Text style={styles.error}>{descriptionError}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={call}>
              {data?.createdMovieList?.isLoading ? (
                <ActivityIndicator
                  color="#fff"
                  style={{flex: 1,}}
                />
              ) : (
                <Text style={{color: '#ffffff'}}>CREATE</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Modal isVisible={showSuccessModal} animationIn="slideInUp" animationOut="slideOutDown">
          <View style={styles.successModal}>
            <Text style={styles.successText}>List id: {data?.createdMovieList?.data?.list_id}</Text>
            <Text style={styles.successText}>Movie added Successfully!</Text>
            <TouchableOpacity onPress={() => {setShowSuccessModal(false); onClose()}}>
              <Text style={styles.closeSuccessModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: 'lightgray',
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
    color: 'black',
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
    color: '#2f2f2f',
    fontWeight: '700',
  },
  AddText: {
    color: '#1554f6',
    fontFamily: '600',
    fontSize: 18,
  },
  separator: {
    borderBottomColor: '#dee1e4',
    borderBottomWidth: 1,
  },
  containerInput: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#f3f3f3',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1554f6',
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  successModal: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  closeSuccessModal: {
    color: '#1554f6',
    fontSize: 16,
  },
});

export default BottomPopup;
