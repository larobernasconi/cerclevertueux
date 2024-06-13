# Cercle Vertueux
[versione live](https://larobernasconi.github.io/cerclevertueux/)

**Autore: Lara Bernasconi**  
SUPSI 2023-234  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

## Introduzione e Tema
Cercle Vertueux è un archivio digitale che raccoglie 100 parole intraducibili da 41 lingue diverse in tutto il mondo. Queste parole racchiudono significati profondi, sfumature culturali ed emozioni che non possono essere tradotti direttamente in altre lingue. L'archivio invita gli utenti a esplorare la ricchezza e la profondità dell'espressione umana, scoprendo la complessità della diversità linguistica e celebrando il legame tra lingua, cultura ed esperienza umana.

## Riferimenti Progettuali
Il principale riferimento di Cercle Vertueux è il concetto di archivio digitale interattivo. Mi sono ispirata a piattaforme come ["The Dictionary of Obscure Sorrows"](https://www.dictionaryofobscuresorrows.com/), che raccoglie parole inventate per descrivere emozioni complesse. Volevo creare un'esperienza utente coinvolgente che permettesse di scoprire parole intraducibili in modo visivamente attraente e interattivo.

## Design dell’Interfaccia e Modalità di Interazione
L'interfaccia di Cercle Vertueux è progettata per essere intuitiva e coinvolgente. Le parole sono disposte lungo un cerchio immaginario al centro della schermata, che ruota in base all'interazione dell'utente con un cursore. Gli utenti possono usare un cursore a scorrimento per ruotare il cerchio e visualizzare le parole disposte lungo di esso. Cliccando su una parola, si apre una finestra pop-up che fornisce ulteriori dettagli sulla parola scelta, inclusa la lingua di origine e il significato.

## Tecnologia Usata

La struttura HTML definisce la base della pagina web, mentre CSS è usato per lo stile e la presentazione visiva e l'interattività è gestita tramite JavaScript, con l'uso della libreria p5.js per visualizzare le parole disposte in cerchio e la loro rotazione. La fetch API permette di caricare i dati delle parole da un file JSON esterno, rendendo l'archivio facilmente aggiornabile e manutenibile.

### Funzione renderWords

La funzione `renderWords` visualizza dinamicamente le parole in un cerchio sullo schermo. Usa JavaScript per calcolare le posizioni delle parole in base alla dimensione della finestra del browser e le visualizza in una disposizione circolare. 

Innanzitutto, la funzione definisce alcune variabili chiave. `output` è una stringa vuota che accumula l'HTML generato per ciascuna parola. `total` memorizza il numero totale di parole da visualizzare, che è la lunghezza dell'array `data`. `centerX` e `centerY` rappresentano le coordinate orizzontali e verticali del centro della finestra del browser, calcolate come metà della larghezza e dell'altezza della finestra. Il raggio del cerchio, `radius`, è determinato come il 35% della dimensione minima tra la larghezza e l'altezza della finestra, assicurando che il cerchio si adatti comodamente allo spazio disponibile.

L'angolo incrementale, `angleIncrement`, è calcolato dividendo l'intero cerchio per il numero totale di parole. Questo determina la spaziatura angolare uniforme tra le parole.

La funzione entra in un ciclo `for` che itera su ciascuna parola nell'array `data`. Per ogni iterazione, l'angolo corrente, `angle`, è calcolato moltiplicando l'indice corrente `i` per `angleIncrement` e aggiungendo `rotationAngle`, che consente l'animazione della rotazione. Le coordinate `x` e `y` per la posizione di ciascuna parola sono calcolate usando `Math.cos` e `Math.sin` per determinare la posizione lungo il cerchio basata sull'angolo.

La stringa HTML per ogni parola è costruita e aggiunta a `output`. Ogni parola è avvolta in un elemento `<a>` con uno stile CSS inline che posiziona l'elemento assolutamente alle coordinate calcolate. La funzione `openOverlay` è associata all'evento `onclick` di ciascun elemento `<a>`, passando i dettagli della parola come parametri per visualizzarli in un overlay. La trasformazione CSS `translate(-50%, -50%)` centra esattamente l'elemento rispetto alle coordinate calcolate, e `rotate(${angle}rad)` ruota il testo in modo che sia orientato correttamente lungo il cerchio.

Dopo il ciclo, il contenuto HTML accumulato in `output` viene inserito nell'elemento `<main>` della pagina usando `innerHTML`. Questo aggiorna dinamicamente la pagina con la nuova disposizione delle parole ogni volta che la funzione viene chiamata. La funzione `renderWords` è progettata per essere chiamata sia durante il caricamento iniziale dei dati che ogni volta che la finestra del browser viene ridimensionata o l'angolo di rotazione viene modificato tramite un controllo dell'utente, garantendo una visualizzazione interattiva e reattiva delle parole.

```javascript
function renderWords() {
    let output = '';
    const total = data.length;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.35;
    const angleIncrement = (2 * Math.PI) / total;

    for (let i = 0; i < total; i++) {
        let angle = i * angleIncrement + rotationAngle;
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);

        output += `<a href="javascript:void(0);" onclick="openOverlay('${data[i].word}', '${data[i].language}', '${data[i].meaning}')" 
        style="position: absolute; left: ${x}px; top: ${y}px; transform: translate(-50%, -50%) rotate(${angle}rad);"
        class="rotated-text">${data[i].word}</a>`;
    }

    document.querySelector('main').innerHTML = output;
}
```

## Target e Contesto d’Uso
Cercle Vertueux è rivolto a chiunque sia interessato alla linguistica, alla cultura e all'esplorazione delle diverse forme di espressione umana. Il contesto d'uso principale è un ambiente educativo o culturale, dove gli utenti possono interagire con l'archivio digitale sia per scopi di apprendimento che di esplorazione personale.
