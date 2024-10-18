import WasteType from "../models/WasteType.js";


export const createWasteType = async (req, res) => {
    try {
      const { userId, typeName, rate, description, refundableType, basedOnWeight } = req.body;
  
      const wasteType = new WasteType({
        userId,
        typeName,
        rate,
        description,
        refundableType,
        basedOnWeight,
      });
  
      const savedWasteType = await wasteType.save();
      res.status(201).json({ message: 'Waste type added successfully', data: savedWasteType });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add waste type', details: error });
    }
  };