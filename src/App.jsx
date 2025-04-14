// Milestone 1

import { useState } from "react";

// const products = [
//   /*0*/ { name: 'Mela', price: 0.5 },
//   /*1*/ { name: 'Pane', price: 1.2 },
//   /*2*/ { name: 'Latte', price: 1.0 },
//   /*3*/ { name: 'Pasta', price: 0.7 },
// ];
//
// const App = () => {
//
//
//     return (
//         <ul>
//             {products.map((product) => <li>{product.name}: {product.price}€</li>)}
//         </ul>
//     )
//
// }
//
// export default App
//////////////////////////////////////////////////////////////////////////////////////

// Milestone 2

/**
* 📌 Milestone 2: Aggiungere prodotti al carrello
Aggiungi uno stato locale addedProducts (inizialmente un array vuoto) per rappresentare i prodotti nel carrello.
Per ogni prodotto della lista, aggiungi un bottone "Aggiungi al carrello":
Al click del bottone, usa una funzione addToCart per:
Aggiungere il prodotto al carrello se non è già presente, con una proprietà quantity = 1.
Se il prodotto è già nel carrello, ignora l’azione.
Sotto alla lista dei prodotti, mostra una lista dei prodotti nel carrello se addedProducts contiene almeno un elemento.
Per ogni prodotto nel carrello, mostra:
Nome
Prezzo
Quantità*/

//Obiettivo: L’utente può aggiungere prodotti al carrello e vedere una lista dei prodotti aggiunti.

// import style from "./style/appStyle.module.css"
// import { FaCartArrowDown } from "react-icons/fa";
// 
// const prodottiInVendita = [
//     /*0*/ { name: 'Mela', price: 0.5 },
//     /*1*/ { name: 'Pane', price: 1.2 },
//     /*2*/ { name: 'Latte', price: 1.0 },
//     /*3*/ { name: 'Pasta', price: 0.7 },
// ];
// 
// const App = () => {
// 
//     const [prodottoAggiunto, setProdottiAggiunto] = useState([])
// 
//     function addToCart(prodotto) {
//         if (!prodottoAggiunto.find((element) => element.name === prodotto.name)) {
//             prodotto.quantity = 1
//             setProdottiAggiunto((curr) => [...curr, prodotto])
//         }
//     }
// 
//     return (
//         <>
//             <ul className={`listaProdotti ${style.ul}`}>
//                 {prodottiInVendita.map((prodotto, index) =>
//                     <div className={style.d_flex} key={index}>
//                         <li className={style.li}>{prodotto.name}: {prodotto.price}€</li>
//                         <button className={style.buttonAdd} onClick={() => { addToCart(prodotto) }}>Aggiungi</button>
//                         <button className={style.buttonDelete}>Elimina</button>
//                     </div>
//                 )}
//             </ul >
//             <div className="content">
//                 <div className={style.flex}>
//                     <h2>Carrello della Spesa</h2><FaCartArrowDown style={{ fontSize: "30px", marginLeft: "12px" }} />
//                 </div>
//                 <div className={style.contenuto}>
//                     {prodottoAggiunto.map((element, index) =>
//                         <div key={index}>
//                             <h4>Name: {element.name}</h4>
//                             <div className={style.d_flex}>
//                                 <p>Quantity: <span className={style.quantity}>{element.quantity}</span></p>
//                                 <p>Price: <span className={style.price}>{element.price}</span></p>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
// 
//         </>
//     )
// 
// }
// 
// 
// 
// export default App

/**
📌 Milestone 3: Modificare il carrello
Al click successivo del bottone "Aggiungi al carrello", se il prodotto è già presente:
Usa una funzione updateProductQuantity per incrementare la proprietà quantity del prodotto esistente.
Per ogni prodotto nel carrello, aggiungi un bottone "Rimuovi dal carrello":
Al click, usa una funzione removeFromCart per rimuovere il prodotto dal carrello.
Sotto alla lista del carrello, mostra il totale da pagare:
Calcola il totale moltiplicando il prezzo per la quantità di ogni prodotto e somma tutti i risultati.
Obiettivo: Gestire l’aggiunta, la rimozione e il calcolo del totale del carrello in modo dinamico.
*/

// IMPORTIAMO GLI ELEMENTI NECESSARI ALL'INTERNO DEL NOSTRO FILE JSX
import style from "./style/appStyle.module.css";
import { FaCartArrowDown } from "react-icons/fa";

// OGGETTO BASE E COPIA PROFONDA DI QUEST'ULTIMO
const prodottiInVendita = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 }
];
const copiaProdotto = JSON.parse(JSON.stringify(prodottiInVendita));
console.log(copiaProdotto);

const App = () => {
    const [prodottoAggiunto, setProdottiAggiunto] = useState([]);

    function addToCart(prodotto) {
        if (!prodottoAggiunto.find((element) => element.name === prodotto.name)) {
            const newProduct = { ...prodotto, quantity: 1 };
            console.log(`Questo è il log del nuovo prodotto aggiunto`, newProduct);
            setProdottiAggiunto((curr) => [...curr, newProduct]);
        }
    }

    function updateProductQuantity(prodotto) {
        if (prodottoAggiunto.find((element) => element.name === prodotto.name)) {
            const constPrice = copiaProdotto.find(element => element.name === prodotto.name).price
            const updatedProduct = prodottoAggiunto.map((element) => element.name === prodotto.name ? { ...element, quantity: element.quantity + 1, price: element.price + constPrice } : element);
            console.log(`Questo è il log del prodotto aggiornato`, updatedProduct);
            setProdottiAggiunto(updatedProduct);
        }
    }

    function removeFromCart(prodotto) {
        const constPrice = copiaProdotto.find(element => element.name === prodotto.name).price
        console.log(constPrice)
        if (prodotto.quantity === 1) {
            const filtredArray = prodottoAggiunto.filter(element => element.name !== prodotto.name);
            setProdottiAggiunto(filtredArray);
        } else {
            setProdottiAggiunto(prodottoAggiunto.map((element) => element.name === prodotto.name ? { ...element, price: element.price - constPrice, quantity: element.quantity - 1 } : element));
        }
    }

    return (
        <>
            <ul className={`listaProdotti ${style.ul}`}>
                {copiaProdotto.map((prodotto, index) =>
                    <div className={`${style.d_flex} acc`} key={index}>
                        <li className={style.li}>{prodotto.name}: {prodotto.price}€</li>
                        <button className={style.buttonAdd} onClick={() => {
                            if (!prodottoAggiunto.some((element) => element.name === prodotto.name)) { addToCart(prodotto) }
                            else if (prodottoAggiunto.some((element) => element.name === prodotto.name)) { updateProductQuantity(prodotto) }
                        }}>Aggiungi al carrello</button>
                    </div>
                )}
            </ul >
            <div className="content">
                <div className={style.flex}>
                    <h2>Carrello della Spesa</h2><FaCartArrowDown style={{ fontSize: "30px", marginLeft: "12px" }} />
                </div>
                <div className={style.contenuto}>
                    {prodottoAggiunto.map((prodotto, index) =>
                        <div key={index} className={style.product}>
                            <h4 className={style.noMargin}>Name: {prodotto.name}</h4>
                            <div className={`${style.d_flex} ${style.center}`}>
                                <div className={style.d_flex}>
                                    <p>Quantity: <span className={style.quantity}>{prodotto.quantity}</span></p>
                                    <p>Price: <span className={style.price}>{prodotto.price.toFixed(2)}</span></p>
                                </div>
                                <button className={style.buttonDelete} onClick={() => { removeFromCart(prodotto) }}>Rimuovi Prodotto</button>
                            </div>
                        </div>
                    )}
                    <hr />
                    <h4>Totale da pagare: {prodottoAggiunto.reduce((acc, curr) => {
                        return acc + curr.price
                    }, 0).toFixed(2)}</h4>
                </div>
            </div >

        </>
    )

}



export default App