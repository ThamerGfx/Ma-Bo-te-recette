import React from 'react';

import AjouterRecette from './AjouterRecette';
import base from '../base';
import MyComponent from './facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class Admin extends React.Component {

    state = {
        uid: null,
        owner: null
    };

    //cycle de vie
    /*componentDidMount() {
        base.onAuth( user => {
            if (user) {
                this.traitementConnexion( null, {user} )
            }
        })
    };
*/
    //fonction pour changer le formulaire
    traiterChangement = (event, key) => {
        const recette = this.props.recettes[key];
        const majRecette = {
            ...recette,
            [event.target.name]: event.target.value
        };
        this.props.majRecette (key, majRecette);
    };

    //fonction pour se connecter à facebook
    connexion = (provider) => {
        base.authWithOAuthPopup( provider, this.traitementConnexion );
    };

    //fonction pour se déconnecter
    deconnexion = () => {
        base.unauth();
        this.setState( { uid: null });
    };

    traitementConnexion = ( err, authData ) => {
        if (err) {
            console.log(err);
            return;
        }
        //recuperer le nom de la boite
        const boxRef = base.database().ref(this.props.match.params.pseudo);
        //demander a firebase les données
        boxRef.once( 'value', snapshot => {
            const data = snapshot.val() || {};
            //attribuer la box si elle n'est à personne
            if (!data.owner) {
                boxRef.set({
                    owner: authData.user.uid
                })
            }
            this.setState ({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        });
    };

    //fonction pour afficher le boutton de connexion à facebook
    renderLogin = () => {
        return (
            <MyComponent />
        )
    };

    //fonction pour afficher tout le formulaire pour maj les recettes
    renderAdmin = (key) => {
        const recette = this.props.recettes[key];
        return (
            <div className="card">
                <form 
                    className="admin-form">

                    <input 
                        name = "nom"
                        type = "text"
                        placeholder = "Nom de la recette"
                        value = { recette.nom }
                        onChange = { (e) => this.traiterChangement (e, key) }
                    />
                    <input 
                        name = "image"
                        type = "text"
                        placeholder = "Adresse de l'image"
                        value = { recette.image }
                        onChange = { (e) => this.traiterChangement (e, key) }
                    />
                    <textarea
                        name = "ingredients"
                        rows = "3"
                        placeholder = "Liste des ingredients séparés par une virgule"
                        value = { recette.ingredients }
                        onChange = { (e) => this.traiterChangement (e, key) }
                    ></textarea>
                    <textarea
                        name = "instructions"
                        rows = "15"
                        placeholder = "Liste des instructions (une par ligne)"
                        value = { recette.instructions }
                    ></textarea>

                </form>
                <button onClick = { () => this.props.supprimerRecette(key) }>Supprimer</button>
            </div>
        )
    };

    render() {

        const deconnexion = <button 
                                onClick={ this.deconnexion }
                            >
                                Déconnexion!
                            </button>

        //s'il existe un propriétaire
        if (!this.state.uid) {
            return (
                <div>{ this.renderLogin () }</div>
            )
        }
        //est ce que c'est le propriétaire
        if ( this.state.uid !== this.state.owner ) {
            return (
                <div className="login">
                    { this.renderLogin () }
                    <p>Tu n'es pas le propriétaire de cette boite à recette.</p>
                </div>
            )
        }
        const adminCards = Object
            .keys(this.props.recettes || {})
            .map(this.renderAdmin);
            
        return (
            <div className="cards">
                <AjouterRecette ajouterRecette = { this.props.ajouterRecette } />
                { adminCards }
                <footer>
                    <button onClick={this.props.chargerExemple}>
                        Remplir
                    </button>
                    { deconnexion }
                </footer>
            </div>
        )
    }
}

export default Admin;