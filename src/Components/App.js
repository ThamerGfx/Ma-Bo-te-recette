// React
import React from 'react';

//components
import Header from './Header';
import Admin from './Admin';
import Card from './Card';

//charger les recettes
import recettes from './Recettes';

//firebase
import base from '../base';

class App extends React.Component {

    state = {
        recettes: {}
    };

	//cycle de vie
	componentWillMount() {
		console.log(this.props)
		this.ref = base.syncState( 
	 		`${this.props.match.params.pseudo}/recette`,
	 		{context: this, state: 'recettes'} 
	 	)
	};

	componentWillUnmount() {
	 	base.removeBinding(this.ref);
	};

    //fonction qui charge les recettes afin de pouvoir les afficher
    chargerExemple = () => {
         this.setState({ recettes });
	};
	
	//fonction pour ajouter une recette
	ajouterRecette = (recette) => {
	 	//on copie notre state dans la constante recettes
	 	const recettes = {...this.state.recettes};
	 	const timestamp = Date.now();
	 	recette [ `recette-${timestamp}` ] = recette;
	 	this.setState({ recettes });
	};

	//fonction pour modifier une recette
	majRecette = (key, majRecette) =>{
		const recettes = {...this.state.recettes};
		recettes [key] = majRecette;
		this.setState({ recettes });
	};

	//fonction pour supprimer une recette
	supprimerRecette = (key) => {
		const recettes = {...this.state.recettes};
		recettes [key] = null;
		this.setState({ recettes });
	};

	render() {

		const cards = Object
		 	.keys(this.state.recettes)
		 	.map( (key) => 
		 		<Card 
		 			key = { key } 
		 			details = { this.state.recettes[key] } 
		 		/>
		 	)
		;
		
		return (
			<div className="box">
				<Header pseudo = {this.props.match.params.pseudo}/>
				<div className="cards">
					<div className="card">
						{cards}
                    </div>
				</div>
                <Admin 
					recettes = { this.state.recettes }
					chargerExemple = { this.chargerExemple }
					ajouterRecette = { this.ajouterRecette }
					majRecette = { this.majRecette }
					supprimerRecette = { this.supprimerRecette }
					pseudo = { this.props.match.params.pseudo }
				/> 
			</div>
		)
	}
}

export default App;