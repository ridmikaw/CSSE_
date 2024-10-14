import WasteRequest from '../models/WasteRequest.js'; 

export const createWasteRequest = async (req, res) => {
  try {
    const { binId, date, notes, userId } = req.body;  
    console.log("CREATE", binId);
    
    // const userId = req.user.userId;

    // if (!userId) {
    //   return res.status(400).json({ message: 'User not authenticated.' });
    // }


    const newWasteRequest = new WasteRequest({
      binId,
      date,
      notes,
      userId, 
    });

    await newWasteRequest.save();

    return res.status(201).json({
      message: 'Waste request created successfully',
      wasteRequest: newWasteRequest,
    });

  } catch (error) {
    console.error('Error creating waste request:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
