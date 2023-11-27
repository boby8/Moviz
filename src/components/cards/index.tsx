import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {color} from '../../utils'
interface Card {
  description: string;
  favorite_count: number;
  id: number;
  iso_639_1: string;
  item_count: number;
  list_type: string;
  name: string;
  poster_path?: any;
}

const Separator = () => <View style={styles.separator} />;

export const Moviecards = ({item}: {item: Card}) => {
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

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: color.WHITE,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: color.BLACK,
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
    color: color.GRAY,
  },
  separator: {
    borderBottomColor: color.CYAN_BLUE,
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    alignItems: 'center',
    backgroundColor: color.WHITE,
    padding: 10,
  },
  viewDeleteButton: {color: color.LIGHT_SHŌJIN_BLUE, fontSize: 18, fontWeight: '500'},
});
