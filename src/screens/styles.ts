import { StyleSheet } from "react-native";
import { color } from "../utils";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 1,
      backgroundColor: color.BLEACHED_SILK,
    },
    headerContainer: {
      backgroundColor: color.WHITE,
      elevation: 5,
      shadowColor: color.BLACK,
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
      color: color.TRICORN_BLACK,
      fontWeight: '700',
    },
    AddText: {
      color: color.LIGHT_SHŌJIN_BLUE,
      fontFamily: '600',
      fontSize: 18,
    },
    flatListContainer: {
      paddingVertical: 16,
      paddingHorizontal: 8,
    },
    cardContainer: {
      backgroundColor: color.WHITE,
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
    activityIndicatorContainer: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
    },
  
    activityIndicator: {
      marginTop: '50%',
    },
    error: {
      color: color.RED,
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
      backgroundColor:color.WHITE,
      padding: 10,
    },
    
  });

  export default styles;
