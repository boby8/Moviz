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
import styles from './styles';
import { color } from '../../utils';
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
      setRefresh(false);
      setShowSuccessModal(true);
    }
  }, [refresh, data?.createdMovieList?.isSuccess, setRefresh]);

  return (
    <Modal
      isVisible={isVisible}
      testID='bottom-popup'
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
            <Text testID='some-element' style={styles.headerText}>Create list</Text>
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
                <ActivityIndicator color={color.WHITE} style={{flex: 1}} />
              ) : (
                <Text style={{color: color.WHITE}}>CREATE</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={showSuccessModal}
          animationIn="slideInUp"
          animationOut="slideOutDown">
          <View style={styles.successModal}>
            <Text style={styles.successText}>
              List id: {data?.createdMovieList?.data?.list_id}
            </Text>
            <Text style={styles.successText}>Movie added Successfully!</Text>
            <TouchableOpacity
              onPress={() => {
                setShowSuccessModal(false);
                onClose();
              }}>
              <Text style={styles.closeSuccessModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};



export default BottomPopup;
