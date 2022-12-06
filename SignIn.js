// import objects
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    ImageBackground, 
    TouchableOpacity,
    Alert,
    SafeAreaView,
    Dimensions,
} from 'react-native';

// importar para navegar entre pantallas
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

// export default class Login extends Component {
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // variables definition
        email:"",
        password:"",
        password2:"",
        name:"",
        lastName1:"",
        lastName2:"",
        picture:"",
        active:0,
    };
  }

  render() {
    // js programming for objects
    const registro = () => {
        let _this = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log("Alta enviada al servidor");
            if (this.readyState == 4 && this.status == 200) {
                console.log("Respuesta: " + xhttp.responseText);
                if(xhttp.responseText == "1"){
                    // desplegar alerta
                    Alert.alert(
                        "Alta Exitosa",
                        "Te has registrado satisfactoriamente.",
                        [{ text: "OK"}]
                    );
                    _this.props.navigation.navigate("Login");
                }
                else{
                    // desplegar alerta
                    Alert.alert(
                        "¡Error!",
                        "No se ha podido realizar el registro. Intenta de nuevo.",
                        [{ text: "OK"}]
                    );
                    console.log("No se pudo completar la insecion en la DB.");
                }
                
            
            }
        };
        xhttp.open("GET", "http://tiendapp.freevar.com/tiendappScrips/altasRepartidores.php?email="+this.state.email+"&password="+this.state.password+"&name="+this.state.name+"&lastName1="+this.state.lastName1+"&lastName2="+this.state.lastName2+"&picture="+this.state.picture+"&active="+this.state.active, true);
        xhttp.send();
    }

    const btnClickRegresar = () => {
        this.props.navigation.navigate("Login")
    }
    
    const validacion = () => {
        if(this.state.email==""||this.state.password==""||this.state.name==""||this.state.lastName1==""||this.state.lastName2==""){
            // desplegar alerta
            Alert.alert(
                "ERROR",
                "Por favor ingresa tu información para registrarte.",
                [{ text: "OK"}]
            );
        }
        else if(!(this.state.password === this.state.password2)){
            // desplegar alerta
            Alert.alert(
                "ERROR",
                "Las contraseñas no coinciden, intenta de nuevo.",
                [{ text: "OK"}]
            );
        }else{
            registro();
        }
    }

    
    
    return (
        <SafeAreaView style={styles.background}>
            <ImageBackground
                style={styles.background}
            >
                <View style={styles.espacioTitulo}>
                    <Text style={styles.textoTitulo}> Registro </Text>
                </View>
                
                <View style={styles.espacioRegistro}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Correo"
                        placeholderTextColor={"black"}
                        // get input and save in var email
                        onChangeText={email => this.setState({email})}
                    />
                    <TextInput 
                        placeholderTextColor={"black"}
                        placeholder="Contraseña"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({password})}
                        />
                    <TextInput 
                        placeholderTextColor={"black"}
                        placeholder="Confirma tu contraseña"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={password2 => this.setState({password2})}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Nombre"
                        placeholderTextColor={"black"}
                        // get input and save in var username
                        onChangeText={name => this.setState({name})}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Apellido Paterno"
                        placeholderTextColor={"black"}
                        // get input and save in var username
                        onChangeText={lastName1 => this.setState({lastName1})}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Apellido Materno"
                        placeholderTextColor={"black"}
                        // get input and save in var username
                        onChangeText={lastName2 => this.setState({lastName2})}
                    />
                    
                </View>
                <View style={styles.espacioFooter}>
                    <TouchableOpacity 
                        style={styles.btnFooter}
                        activeOpacity={0.7}
                        onPress={btnClickRegresar}
                    >
                        <Text style={styles.textoFooter}>Regresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.btnFooter}
                        activeOpacity={0.7}
                        onPress={validacion}
                    >
                        <Text style={styles.textoFooter}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground> 
        </SafeAreaView>
    );
  }
}


// styles
const styles = StyleSheet.create({
    background:{
        backgroundColor: "#F7F9F9",
        // Make sure the bg image stays same size when keyboard displays
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex:1,
    },
    btnEntrar:{
        width:"50%",
        height: "12%",
        alignSelf: "center",
        marginTop: 20,
        backgroundColor:"#78D5D7",
        // borderWidth:2,
        borderRadius: 8,
        justifyContent:"center",
        alignItems:"center",        
    },
    input:{
        borderWidth: 2,
        fontSize: 25,
        marginTop: 10,
        marginHorizontal: 30,
        borderRadius: 8,
        color:"black",
    },
    textoTitulo:{
        fontWeight:"bold",
        fontSize: 40,
        color: "#F7F9F9",
        textAlign: "center",
        fontFamily:"arial",
    },
    textoBoton:{
        fontSize: 30,
        color:"#F7F9F9",
        fontWeight:"bold",
        
    },
    espacioTitulo:{
        flex: 3,
        justifyContent:"center",
        backgroundColor:"#63D2FF"
    },
    espacioRegistro:{
        flex: 15,
    },
    espacioFooter:{
        flex:2,
        backgroundColor:"#2081C3",
        flexDirection:"row",
        // borderTopWidth:1,
    }, 
    btnFooter:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        // borderRightWidth:1,
        // borderLeftWidth:1,
    },
    textoFooter:{
        fontSize:30,
        fontWeight:"bold",
        color:"#F7F9F9"
    },
})