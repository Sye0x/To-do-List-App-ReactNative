import { useState } from "react";
import { StyleSheet, View, Text ,TextInput,Pressable ,Modal,ScrollView} from "react-native";

import GoalItems from "@/components/GoalItems";

  function GoalInput(props:any) {
    
    const [NewGoal, SetText] = useState('');
  

    /*function setitem(NewGoal:string) {
    
      SetCourseText(currentCourseGoals => [...currentCourseGoals, NewGoal]);     
    }*/
  
    function deletegoal(id: any) {
      /*SetCourseText(currentCourseGoals => {
        return currentCourseGoals.filter(goal => goal !== id);
      });*/
      props.onDelete1(id);
      
    }

    function goalinput(enteredText: string) {
        SetText(enteredText);
      }

    function additems() {
        if (NewGoal.trim().length === 0) return; // Prevent adding empty goals
        props.additem(NewGoal);
        /*setitem(NewGoal);*/
        SetText(""); // Clear the input field
    }
    function cleartext() {
      SetText(""); // Clear the input field
      props.endModal();
    }
    
  return (
    
    <Modal  visible={props.ShowModal}  animationType="fade"   >
    <View style={styles.Additem}>
        <TextInput
          placeholder="Add Item"
          style={styles.InputBox}
          onChangeText={goalinput}
          value={NewGoal}
        />
        <View style={styles.buttoncontainer}>
        <Pressable style={styles.button} onPress={additems}>
          <Text style={styles.buttontext}>+</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={cleartext}>
          <Text style={styles.buttontext}>x</Text>
        </Pressable>    
        </View>
        
      </View>
      <View style={{backgroundColor:"black",flex:1}}>
      <View>
        <Text style={styles.SectionHeading}>Today's Tasks</Text>
      </View>
      <View style={{ margin: 10,flex:1 }}>
        <ScrollView>
        
        { props.itemslist.map((goal: any, index: any) => (
          <GoalItems text={goal} key={index} onDelete={deletegoal}/>
        
        ))}
        </ScrollView>
      </View>
      </View>

      </Modal>
      
  );
}

export default GoalInput;

const styles = StyleSheet.create({
    Additem: {
        
        backgroundColor:"black",
        paddingVertical: 20,
        borderBottomColor: "#777777",
        borderBottomWidth: 1,
        paddingBottom: 30,
      },
      InputBox: {
        margin: 10,
        borderWidth: 2,
        borderColor: "blue",
        borderRadius: 20,
        width: '95%',
        height: 45,
        paddingLeft: 10,
        paddingRight:10,
        backgroundColor: "#ffffff",
      },
    button: {
        backgroundColor: "#ffffff",
        
        height: 60,
        width: 60,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: "blue",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      buttontext: {
        fontSize: 26,
        color: "#999",
        fontWeight: "bold",
      }, 
      buttoncontainer:{
        flexDirection:"row",
        justifyContent:"space-around",

      },
      SectionHeading: {
        color: "#302cab",
        fontSize: 30,
        marginTop: 50,
        fontWeight: "bold",
        marginBottom: 30,
        marginLeft: 10,
      },
});


