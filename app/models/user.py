from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

DEFAULT_AVATAR_URL = 'https://www.premiumseatsusa.com/special-events/wp-content/uploads/2019/03/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
# This is primarily used for seeder -> default value for front-end is in session store

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(255), nullable=True)
    avatar_url = db.Column(db.String(255), nullable=False,
                           default=DEFAULT_AVATAR_URL)
    hashed_password = db.Column(db.String(255), nullable=False)

    # relationships
    images = db.relationship(
        'Image', back_populates='user', cascade="all, delete-orphan")
    image_likes = db.relationship(
        'ImageLike', back_populates='user', cascade="all, delete-orphan")
    comments = db.relationship(
        'Comment', back_populates='user', cascade="all, delete-orphan")
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.followed_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'profile_url': self.avatar_url,
            'followers': [follower.id for follower in self.followers],
            'following': [following.id for following in self.following],
            'image_ids': [image.id for image in self.images]
        }
