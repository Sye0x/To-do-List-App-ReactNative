import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import GoalItems from "@/components/GoalItems";
import GoalInput from "@/components/GoalInput";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [CourseGoals, SetCourseText] = useState<string[]>([]);
  const [ModalVisible, SetModal] = useState(false);

  useEffect(() => {
    const loadStoredGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem('myitems');
        if (storedGoals !== null) {
          SetCourseText(JSON.parse(storedGoals));
        }
      } catch (error) {
        console.error('Failed to load goals from storage:', error);
      }
    };
    loadStoredGoals();
  }, []);

  function SetModalHandler() {
    SetModal(true);
  }

  function EndModalHandler() {
    SetModal(false);
  }

  const setitem = async (NewGoal: string) => {
    SetCourseText(currentCourseGoals => {
      const updatedGoals = [...currentCourseGoals, NewGoal];
      AsyncStorage.setItem('myitems', JSON.stringify(updatedGoals)); // Save the updated goals
      return updatedGoals;
    });
  };

  const deletegoal = async (id: string) => {
    SetCourseText(currentCourseGoals => {
      const updatedGoals = currentCourseGoals.filter(goal => goal !== id);
      AsyncStorage.setItem('myitems', JSON.stringify(updatedGoals)); // Save the updated goals
      return updatedGoals;
    });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.ScreenHead}>
        <Pressable 
          onPress={SetModalHandler} 
          style={{ marginTop: 15 }}>
          <Text style={styles.ModalButton}>Add Task's</Text>
        </Pressable>
        
        <GoalInput 
          itemslist={CourseGoals} 
          onDelete1={deletegoal} 
          endModal={EndModalHandler} 
          ShowModal={ModalVisible} 
          additem={setitem}
        />
        
        <View>
          <Text style={styles.SectionHeading}>Today's Tasks</Text>
        </View>
        <View style={{ margin: 10, flex: 1 }}>
          <ScrollView>
            {CourseGoals.map((goal, index) => (
              <GoalItems text={goal} key={index} onDelete={deletegoal} />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ScreenHead: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#000000",
  },
  SectionHeading: {
    color: "#302cab",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "bold",
    marginBottom: 30,
    marginLeft: 10,
  },
  ModalButton: {
    backgroundColor: "blue",
    color: "white",
    height: 45,
    width: "50%",
    textAlign: "center",
    paddingTop: 13,
    marginHorizontal: "25%",
    borderRadius: 50,
    borderBottomColor: "#5e0acc",
    borderBottomWidth: 3,
    borderRightColor: "#5e0acc",
    borderRightWidth: 3,
  },
});
