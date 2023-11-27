import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import BottomPopup from '../components/bottomModal';
import {getListRequest, createnewMovieRequest} from '../redux/actions';
import {Pagination} from '../components/pagination';
import {Moviecards} from '../components/cards';
import styles from './styles';
interface MyListProps {
  name: string;
}

const MyList: React.FC<MyListProps> = ({}) => {
  const dispatch = useDispatch();
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getListRequest(page));
  }, []);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const handleLoadMore = (num: number) => {
    setPage(num);
    dispatch(getListRequest(num));
  };

  const data = useSelector((state: any) => state.Lists);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>My Lists</Text>
              <TouchableOpacity onPress={togglePopup}>
                <Text style={styles.AddText}>Add</Text>
              </TouchableOpacity>
              <BottomPopup
                isVisible={isPopupVisible}
                onClose={togglePopup}
                createnewMovieRequest={createnewMovieRequest}
              />
            </View>
          </View>
          {data?.totalMovieList?.isLoading ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator
                size={'large'}
                style={styles.activityIndicator}
              />
            </View>
          ) : data?.totalMovieList?.isSuccess ? (
            <FlatList
              data={
                data?.totalMovieList?.data?.results &&
                data?.totalMovieList?.data?.results
              }
              renderItem={Moviecards}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.flatListContainer}
            />
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>Something went Wrong!</Text>
            </View>
          )}
          {data?.totalMovieList?.data && (
            <Pagination page={page} handleLoadMore={handleLoadMore} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyList;
