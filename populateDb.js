// Importation des modules nécessaires
const mongoose = require('mongoose');

const Conversation = require('./database/Conversation');
const Event = require('./database/Event');
const Favorite = require('./database/Favorite');
const Message = require('./database/Message');
const ParticipantConversation = require('./database/ParticipantConversation');
const User = require('./database/User');

const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "projet_test";

// Documents à insérer dans les collections
const initialData = {
    conversations: [
        { subject: 'Discussion sur le projet X', created_at: new Date('2024-01-15T10:00:00Z') },
        { subject: 'Mise à jour sur la version 2.0', created_at: new Date('2024-02-20T15:30:00Z') },
        { subject: 'Planning pour le trimestre', created_at: new Date('2024-03-05T09:45:00Z') },
        { subject: 'Nouveaux membres dans l\'équipe', created_at: new Date('2024-04-01T11:00:00Z') },
        { subject: 'Feedback client et améliorations', created_at: new Date('2024-05-10T14:15:00Z') },
        { subject: 'Atelier technique sur Node.js', created_at: new Date('2024-06-25T10:00:00Z') }
    ],
    events: [
        {
            name: 'Conférence JavaScript',
            theme: 'Développement Web',
            image_url: 'https://example.com/images/js-conference.jpg',
            price: 50,
            event_date: new Date('2024-12-10T09:00:00Z'),
            creator_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c12345678') // Remplacez par un ObjectId existant
        },
        {
            name: 'Atelier de Machine Learning',
            theme: 'Intelligence Artificielle',
            image_url: 'https://example.com/images/ml-workshop.jpg',
            price: 75,
            event_date: new Date('2024-11-25T14:00:00Z'),
            creator_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c87654321') // Remplacez par un ObjectId existant
        },
        {
            name: 'Festival de la Technologie',
            theme: 'Innovation',
            image_url: 'https://example.com/images/tech-festival.jpg',
            price: 100,
            event_date: new Date('2025-01-15T10:30:00Z'),
            creator_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c12345678') // Remplacez par un ObjectId existant
        },
        {
            name: 'Forum des Entrepreneurs',
            theme: 'Business',
            image_url: 'https://example.com/images/entrepreneur-forum.jpg',
            price: 60,
            event_date: new Date('2025-03-22T13:00:00Z'),
            creator_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c87654321') // Remplacez par un ObjectId existant
        },
        {
            name: 'Conférence sur la Cybersécurité',
            theme: 'Sécurité Informatique',
            image_url: 'https://example.com/images/cybersecurity-conference.jpg',
            price: 90,
            event_date: new Date('2025-04-05T11:00:00Z'),
            creator_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c87654321') // Remplacez par un ObjectId existant
        }
    ],
    favorites: [
        {
            favorite_user_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c12345678'), // ID d'utilisateur existant
            favorite_event_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e87654321'), // ID d'événement existant
            added_at: new Date('2024-10-15T09:00:00Z')
        },
        {
            favorite_user_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c87654321'), // ID d'utilisateur existant
            favorite_event_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e12345678'), // ID d'événement existant
            added_at: new Date('2024-11-01T14:30:00Z')
        },
        {
            favorite_user_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c12345678'), // ID d'utilisateur existant
            favorite_event_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e87654322'), // ID d'événement existant
            added_at: new Date('2024-12-10T16:45:00Z')
        },
        {
            favorite_user_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c87654321'), // ID d'utilisateur existant
            favorite_event_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e12345679'), // ID d'événement existant
            added_at: new Date('2024-09-05T11:20:00Z')
        }
    ],
    messages: [
        {
            content: 'Bonjour, avez-vous des nouvelles sur le projet X ?',
            sent_at: new Date('2024-10-15T08:45:00Z'),
            sender_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c12345678'), // Remplacez par un ObjectId existant de User
            conversation_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e12345678') // Remplacez par un ObjectId existant de Conversation
        },
        {
            content: 'Oui, nous avons terminé les premières étapes de développement.',
            sent_at: new Date('2024-10-15T09:00:00Z'),
            sender_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c87654321'), // Remplacez par un ObjectId existant de User
            conversation_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e12345678') // Remplacez par un ObjectId existant de Conversation
        },
        {
            content: 'Quand pourrions-nous organiser une réunion pour la démo ?',
            sent_at: new Date('2024-10-16T10:15:00Z'),
            sender_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c12345678'), // Remplacez par un ObjectId existant de User
            conversation_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e12345678') // Remplacez par un ObjectId existant de Conversation
        },
        {
            content: 'Bonjour tout le monde ! Nous avons lancé la version 2.0 !',
            sent_at: new Date('2024-11-05T14:20:00Z'),
            sender_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c87654322'), // Remplacez par un ObjectId existant de User
            conversation_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e87654321') // Remplacez par un ObjectId existant de Conversation
        },
        {
            content: 'Félicitations à toute l\'équipe !',
            sent_at: new Date('2024-11-05T14:30:00Z'),
            sender_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c12345679'), // Remplacez par un ObjectId existant de User
            conversation_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e87654321') // Remplacez par un ObjectId existant de Conversation
        }
    ],
    participantConversations: [
        {
            participant_user_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c12345678'), // Remplacez par un ObjectId existant de User
            conversation_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e12345678') // Remplacez par un ObjectId existant de Conversation
        },
        {
            participant_user_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c87654321'), // Remplacez par un ObjectId existant de User
            conversation_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e12345678') // Remplacez par un ObjectId existant de Conversation
        },
        {
            participant_user_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c12345679'), // Remplacez par un ObjectId existant de User
            conversation_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e87654321') // Remplacez par un ObjectId existant de Conversation
        },
        {
            participant_user_id: new mongoose.Types.ObjectId('64b5f41d2c8f1b3c87654322'), // Remplacez par un ObjectId existant de User
            conversation_id: new mongoose.Types.ObjectId('64b5f52e2d8f2c3e87654321') // Remplacez par un ObjectId existant de Conversation
        }
    ],
    users: [
        {
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'hashed_password_1', // Assurez-vous que ce mot de passe soit haché dans la vraie application
            role: 'user',
            avatar_url: 'https://example.com/avatars/john_doe.jpg',
            first_name: 'John',
            last_name: 'Doe',
            birth_date: new Date('1990-05-15'),
            created_at: new Date('2023-01-10T10:00:00Z')
        },
        {
            username: 'jane_smith',
            email: 'jane.smith@example.com',
            password: 'hashed_password_2', // Assurez-vous que ce mot de passe soit haché dans la vraie application
            role: 'admin',
            avatar_url: 'https://example.com/avatars/jane_smith.jpg',
            first_name: 'Jane',
            last_name: 'Smith',
            birth_date: new Date('1985-03-25'),
            created_at: new Date('2023-02-20T11:30:00Z')
        },
        {
            username: 'alice_wonder',
            email: 'alice.wonder@example.com',
            password: 'hashed_password_3', // Assurez-vous que ce mot de passe soit haché dans la vraie application
            role: 'user',
            avatar_url: 'https://example.com/avatars/alice_wonder.jpg',
            first_name: 'Alice',
            last_name: 'Wonder',
            birth_date: new Date('1992-07-30'),
            created_at: new Date('2023-03-15T09:15:00Z')
        },
        {
            username: 'bob_builder',
            email: 'bob.builder@example.com',
            password: 'hashed_password_4', // Assurez-vous que ce mot de passe soit haché dans la vraie application
            role: 'user',
            avatar_url: 'https://example.com/avatars/bob_builder.jpg',
            first_name: 'Bob',
            last_name: 'Builder',
            birth_date: new Date('1988-12-10'),
            created_at: new Date('2023-04-25T14:00:00Z')
        }
    ]
};

// Fonction principale pour insérer les documents dans chaque collection
async function insertDocuments() {
    try {
        // Connexion à MongoDB
        await mongoose.connect(url + '/' + dbName);
        console.log('Connexion à MongoDB réussie.');

        // Liste des collections à créer
        const collections = [
            { name: 'conversations', model: Conversation,  data: initialData.conversations },
            { name: 'events', model: Event, data: initialData.events },
            { name: 'favorites', model: Favorite,  data: initialData.favorites },
            { name: 'messages', model: Message,  data: initialData.messages },
            { name: 'participantconversations', model: ParticipantConversation,  data: initialData.participantConversations },
            { name: 'users', model: User, data: initialData.users }  
        ];

        // Boucle pour vérifier et insérer les données
        for (const { name, model, data } of collections) {
            const existingDocs = await model.find();
            if (existingDocs.length === 0) {
                console.log(`Insertion de documents dans la collection "${name}"...`);
                await model.insertMany(data);
                console.log(`${data.length} documents insérés dans la collection "${name}".`);
            } else {
                console.log(`La collection "${name}" contient déjà des documents. Aucun document ajouté.`);
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'insertion des documents:', error);
    } finally {
        // Fermeture de la connexion à MongoDB
        await mongoose.connection.close();
        console.log('Connexion à MongoDB fermée.');
    }
}

// Exécution de la fonction
insertDocuments();
