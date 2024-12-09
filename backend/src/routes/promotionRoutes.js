const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');


router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promotions', error });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (promotion) {
      res.json(promotion);
    } else {
      res.status(404).json({ message: 'Promotion not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promotion', error });
  }
});


router.post('/add', async (req, res) => {
    const { code, discount, validFrom, validTo, status } = req.body;
    try {
      const newPromotion = new Promotion({
        code,
        discount,
        validFrom,
        validTo,
        status,
        createdAt: new Date()
      });
  
      await newPromotion.save();
      res.status(201).json(newPromotion);
    } catch (error) {
      console.error("Error creating promotion:", error); 
      if (error.errInfo) {
        console.error("Validation details:", JSON.stringify(error.errInfo.details, null, 2)); 
      }
      res.status(500).json({ 
        message: 'Error creating promotion', 
        error: error.message, 
        details: error.errInfo 
      });
    }
  });
  
  
  
  


router.put('/:id', async (req, res) => {
  const { code, discount, validFrom, validTo, status } = req.body;

  try {
    const promotion = await Promotion.findById(req.params.id);

    if (promotion) {
      promotion.code = code;
      promotion.discount = discount;
      promotion.validFrom = validFrom;
      promotion.validTo = validTo;
      promotion.status = status;

      const updatedPromotion = await promotion.save();
      res.json(updatedPromotion);
    } else {
      res.status(404).json({ message: 'Promotion not found' });
    }
  } catch (error) {
    console.error("Error updating promotion:", error); 
    res.status(500).json({ message: 'Error updating promotion', error });
  }
});


router.put('/:id/status', async (req, res) => {
  const { status } = req.body;

  try {
    const promotion = await Promotion.findById(req.params.id);

    if (promotion) {
      promotion.status = status;

      const updatedPromotion = await promotion.save();
      res.json(updatedPromotion);
    } else {
      res.status(404).json({ message: 'Promotion not found' });
    }
  } catch (error) {
    console.error("Error updating promotion status:", error); 
    res.status(500).json({ message: 'Error updating promotion', error });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);

    if (promotion) {
      await promotion.remove();
      res.json({ message: 'Promotion removed' });
    } else {
      res.status(404).json({ message: 'Promotion not found' });
    }
  } catch (error) {
    console.error("Error deleting promotion:", error); 
    res.status(500).json({ message: 'Error deleting promotion', error });
  }
});

module.exports = router;
