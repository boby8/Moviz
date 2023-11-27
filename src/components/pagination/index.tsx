import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
interface MyProps {
  page: number;
  handleLoadMore: any;
}
export const Pagination: React.FC<MyProps> = ({page, handleLoadMore}) => {
  const data = useSelector((state: any) => state.Lists);

  return (
    <View style={styles.paginayionContainer}>
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
  );
};

const styles = StyleSheet.create({
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
  paginayionContainer: {
    paddingBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
