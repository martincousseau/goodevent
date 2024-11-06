const {mongoose} = require('mongoose');

const Conversation = require('./database/Conversation');
const Event = require('./database/Event');
const Favorite = require('./database/Favorite');
const Message = require('./database/Message');
const ParticipantConversation = require('./database/ParticipantConversation');
const User = require('./database/User');

const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "projet_test";

async function createDatabaseAndCollections() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(url + '/' + dbName);
        console.log('Connexion à MongoDB réussie.');

        // Vérification et création des collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);

        // Liste des collections à créer
        const requiredCollections = [
            { name: 'conversations', model: Conversation },
            { name: 'events', model: Event },
            { name: 'favorites', model: Favorite },
            { name: 'messages', model: Message },
            { name: 'participantconversations', model: ParticipantConversation },
            { name: 'users', model: User }  
        ];

        // Parcours de la liste pour créer les collections manquantes
        for (const { name, model } of requiredCollections) {
            if (!collectionNames.includes(name)) {
                console.log(`Création de la collection "${name}"...`);
                await mongoose.connection.db.createCollection(name);
                console.log(`Collection "${name}" créée avec succès.`);
            } else {
                console.log(`La collection "${name}" existe déjà.`);
            }
        }
    }
    catch (error) {
        console.error('Erreur lors de la création des collections',error);
    }
    finally {
        // Fermeture de la connexion à MongoDB
        await mongoose.connection.close();
        console.log('Connexion à MongoDB fermée.');
    }
}

createDatabaseAndCollections();