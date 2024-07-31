import React, { useState, useMemo, useEffect,useContext} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { db } from '../../FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/contextAuth';
import { useNavigation } from '@react-navigation/native'; 
import { icons } from '../../constants';



LocaleConfig.locales['fr'] = {

  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  monthNamesShort: [
    'Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'
  ],
  dayNames: [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
  ],
  dayNamesShort: [
    'Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'
  ],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

const initDate = '2023-12-01';

const Calendar = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selected, setSelected] = useState(initDate);
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();
  const navigation = useNavigation(); // Get the navigation object

  const marked = useMemo(() => ({
    [selected]: {
      customStyles: {
        container: {
          backgroundColor: 'white',
          borderRadius: 20,
        },
        text: {
          color: '#161622',
        }
      }
    }
  }), [selected]);
  
   const fetchEntries = async (date) => {
    if (!user) return; // Ensure user is available

    const q = query(
      collection(db, "rating"),
      where("date", "==", date),
      where("userId", "==", user.userId) // Compare userId
    );
    const querySnapshot = await getDocs(q);
    const fetchedEntries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setEntries(fetchedEntries);
    console.log('fetched', fetchedEntries);

  // Navigate to MoodEntries with the fetched entries
  navigation.navigate('MoodEntries', { entries: fetchedEntries });
    
  };
  

  useEffect(() => {
    if (selected && selected !== initDate) {
      fetchEntries(selected);
    }
  }, [selected]);

  

  return (
    <View style={styles.container}>
      <CalendarList
        pastScrollRange={9}
        futureScrollRange={0}
        scrollEnabled={true}
        showScrollIndicator={true}
        maxDate={today}
        onDayPress={(day) => {
          console.log('selected day', day);
          setSelected(day.dateString); // Update selected date
        }}
        markedDates={marked}
        markingType={'custom'}
        theme={{
          // backgroundColor: '#247ba0',
          calendarBackground: '#161622',
          textSectionTitleColor: '#ffffff',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: 'red',
          selectedDayTextColor: '#7B88F2',
          todayTextColor: '#161622',
          todayBackgroundColor: '#7B88F2',
          dayTextColor: '#7B88F2',
          textDisabledColor: '#d9e1e8',
          // dotColor: '#00adf5',
          // selectedDotColor: '#ffffff',
          // arrowColor: 'orange',
          // disabledArrowColor: '#d9e1e8',
          monthTextColor: '#7B88F2',
          // indicatorColor: 'blue',
          // textDayFontFamily: 'monospace',
          // textMonthFontFamily: 'monospace',
          // textDayHeaderFontFamily: 'monospace',
          // textDayFontWeight: '300',
          // textMonthFontWeight: 'bold',
          // textDayHeaderFontWeight: '300',
          // textDayFontSize: 16,
          // textMonthFontSize: 16,
          // textDayHeaderFontSize: 16
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
    
  },
  card: {
    backgroundColor: '#1A2E46',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  date: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  mood: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default Calendar;
