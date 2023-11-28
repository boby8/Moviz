import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {color} from '../../utils';
interface MyProps {
  page: number;
  handleLoadMore: any;
}
export const Pagination: React.FC<MyProps> = ({page, handleLoadMore}) => {
  const data = useSelector((state: any) => state.Lists);

  return (
    <View style={styles.paginayionContainer} testID="pagination-next">
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
    backgroundColor: color.WHITE,
    padding: 10,
  },
  viewDeleteButton: {
    color: color.LIGHT_SHŌJIN_BLUE,
    fontSize: 18,
    fontWeight: '500',
  },
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
