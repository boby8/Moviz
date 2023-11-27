import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
  ActivityIndicator,
} from 'react-native';
import BottomPopup from '../components/BottomModal';
import {getListRequest, createnewMovieRequest} from '../redux/actions';
interface MyListProps {
  name: string;
}

interface Card {
  description: string;
  favorite_count: number;
  id: number;
  iso_639_1: string;
  item_count: number;
  list_type: string;
  name: string;
  poster_path: any;
}

const Separator = () => <View style={styles.separator} />;
const handleView = (card: Card) => {};

const handleDelete = (cardId: string) => {};

const renderCard = ({item}: {item: Card}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardName}>{item?.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Separator />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.viewDeleteButton}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.viewDeleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    console.log(num,":::", data?.totalMovieList?.data?.total_pages)
    dispatch(getListRequest(num));
  };

  const data = useSelector((state: any) => state.Lists);
  console.log(data?.totalMovieList?.data?.total_pages,"Out side" ,page);

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
              renderItem={renderCard}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.flatListContainer}
            />
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>Something went Wrong!</Text>
            </View>
          )}
          <View
            style={styles.paginayionContainer}>
            <TouchableOpacity
              style={styles.button}
              disabled={page === 1 ? true : false}
              onPress={() => handleLoadMore(page - 1)}>
              <Text style={styles.nextPreviousButton}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.viewDeleteButton}>{page}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLoadMore(page + 1)}
              disabled={
                data?.totalMovieList?.data?.total_pages === page ? true : false
              }>
              <Text style={styles.nextPreviousButton}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#f3f3f3',
  },
  headerContainer: {
    backgroundColor: 'white',
    elevation: 5, // for Android shadow
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 120,
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
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: 'gray',
  },
  separator: {
    borderBottomColor: '#dee1e4',
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityIndicatorContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },

  activityIndicator: {
    marginTop: '50%',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fffff',
    padding: 10,
  },
  viewDeleteButton: {color: '#1554f6', fontSize: 18, fontWeight: '500'},
  nextPreviousButton: {
    fontSize: 17,
    fontWeight: '600',
  },
  paginayionContainer:{
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  }
});

export default MyList;
