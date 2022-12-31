const Card = require('../models/card');
const { message, SUCCESS, CREATED } = require('../helpers/constants');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.status(SUCCESS).json(cards);
  } catch (err) {
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const {
      createdAt, likes, link, name, _id, owner,
    } = await Card.create({ name: req.body.name, link: req.body.link, owner: req.user._id });
    return res.status(CREATED).json({
      createdAt, likes, link, name, _id, owner: { _id: owner },
    });
  } catch (err) {
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;
    const card = await Card.findByIdAndRemove(cardId);
    if (card === null) {
      return next(new NotFoundError(message.errorNotFound.cardId));
    }
    if (userId !== JSON.stringify(card.owner).replace(/\W/g, '')) {
      return next(new ForbiddenError(message.errorForbidden));
    }
    return res.status(SUCCESS).json({ message: message.success.cardDelete });
  } catch (err) {
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (card === null) {
      return next(new NotFoundError(message.errorNotFound.cardId));
    }
    return res.status(SUCCESS).json(card);
  } catch (err) {
    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (card === null) {
      return next(new NotFoundError(message.errorNotFound.cardId));
    }
    return res.status(SUCCESS).json(card);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
