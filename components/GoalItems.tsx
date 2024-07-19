import { StyleSheet, View, Text,Pressable } from "react-native";



function GoalItems(props:any) {
  
  function deleteitem(params:any) {
    props.onDelete(props.text)
  }
  
  return (
    <View style={styles.itembox} >
    <Pressable 
    android_ripple={{color:"#ADD8E6"}}
    onPress={deleteitem}
    style={({pressed})=> pressed && styles.presseditem}>
      <Text style={styles.itemtext}>{props.text}</Text>
    </Pressable>
    </View>
  );
}

export default GoalItems;

const styles = StyleSheet.create({
  presseditem:{
    opacity:0.5,
    backgroundColor:"#ADD8E6"
  },
  itembox: {
    margin: 10,
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "blue",
    borderRadius: 10,
  },
  itemtext: {
    fontSize: 20,
    padding: 10,
  },
});
