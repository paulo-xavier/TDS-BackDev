const db = require('./pharmacy.json');

const fs = require('fs')

const express = require('express'); 
const server = express();

server.use(express.json()); 

server.listen(3000, () => {
    console.log("Server working..."); 
})

// MEDICINE
server.get('/medicine', (req, res) => {
    return res.json(db.Medicine)
})

server.post('/medicine', (req, res) => {
    const medicineInfo = req.body; 

    if (!medicineInfo.name_medicine || !medicineInfo.producer_medicine || !medicineInfo.price_medicine || !medicineInfo.quantity_medicine)  {
        
        return res.status(400).json({
            message: "Uncompleted data!!"
        })
    
    } else {
        db.Medicine.push(medicineInfo);
        saveData(); 

        return res.status(201).json({
            message: "Operation executed!!"
        })
    } 
})

server.put('/medicine/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const medicineData = req.body; 

    const medicineIndex = db.Medicine.findIndex(medicine => medicine.id_medicine === id); 

    if (medicineIndex === -1) {
        return res.status(400).json({
            message: "Medicine not found!!"
        })
    }

    db.Medicine[id].name_medicine = medicineData.name_medicine || db.Medicine[id].name_medicine;   

    db.Medicine[id].producer_medicine = medicineData.producer_medicine || db.Medicine[id].producer_medicine; 

    db.Medicine[id].price_medicine = medicineData.price_medicine || db.Medicine[id].price_medicine; 

    db.Medicine[id].quantity_medicine = medicineData.quantity_medicine || db.Medicine[id].quantity_medicine;

    saveData()

    return res.status(200).json({
        message: "Update executed!!"
    });
})


server.delete('/medicine/:id', (req, res) => {
    const id = parseInt(req.params.id); 

    const medicineIndex = db.Medicine.findIndex(medicine => medicine.id_medicine === id); 

    if (medicineIndex === -1){
        return res.status(400).json({
            message: "Medicine not found!!"
        })
    }

    db.Medicine = db.Medicine.filter(medicine => medicine.id_medicine !== id);

    saveData()
    
    return res.status(200).json({
        message: "Delete executed!!"
    })
})

// --------------------------------------------------------------------- || ---------------------------------------------------------------------


// CLIENT

server.get('/client', (req, res) => {
    return res.json(db.Client); 
})

server.post('/client', (req, res) => {
    const clientData = req.body; 

    if (!clientData.name_client || !clientData.address_client || !clientData.email_client || !clientData.phone_client) {
        return res.status(400).json({
            message: "Uncompleted data!!"
        })
    
    } else {

        db.Client.push(clientData)
        
        saveData()

        res.status(200).json({
            message: "Client registered!!"
        })

    }
})

server.put('/client/:id', (req, res) => {
    const clientId = parseInt(req.params.id); 
    const clientData = req.body; 

    const clientIndex = db.Client.findIndex(client => client.id_client === clientId); 

    if (clientIndex === -1) {
        res.status(400).json({
            message: "Client not found!!"
        })
    }

    db.Client[clientIndex].name_client = clientData.name_client || db.Client[clientIndex].name_client;

    db.Client[clientIndex].address_client = clientData.address_client || db.Client[clientIndex].address_client; 

    db.Client[clientIndex].email_client = clientData.email_client || db.Client[clientIndex].email_client; 

    db.Client[clientIndex].phone_client = clientData.phone_client || db.Client[clientIndex].phone_client; 

    saveData()

    return res.status(200).json({
        message: "Client updated!!"
    })
})


server.delete('/client/:id', (req, res) => {
    const clientId = parseInt(req.params.id);
    
    const clientIndex = db.Client.findIndex(client => client.id_client === clientId); 

    if (clientIndex === -1) {
        res.status(400).json({
            message: "User not found!!"
        })
    }

    db.Client = db.Client.filter(client => client.id_client !== clientIndex);

    saveData()

    return res.status(200).json({
        message: "Client deleted!!"
    })

})


function saveData() {
    fs.writeFileSync(__dirname + "/pharmacy.json",  JSON.stringify(db, null, 2)); 
}