"""changed following table

Revision ID: 7bbfc3d9fef7
Revises: 57d1bddaa3fb
Create Date: 2021-10-11 08:59:25.270238

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '7bbfc3d9fef7'
down_revision = '57d1bddaa3fb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('followed_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], )
    )
    op.drop_table('following')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('following',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('follower_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('following_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], name='following_follower_id_fkey'),
    sa.ForeignKeyConstraint(['following_id'], ['users.id'], name='following_following_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='following_pkey')
    )
    op.drop_table('follows')
    # ### end Alembic commands ###