"""empty message

Revision ID: 80005b95f103
Revises: 7bbfc3d9fef7
Create Date: 2021-10-14 13:19:08.308856

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '80005b95f103'
down_revision = '7bbfc3d9fef7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('bio', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('avatar_url', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'avatar_url')
    op.drop_column('users', 'bio')
    # ### end Alembic commands ###
