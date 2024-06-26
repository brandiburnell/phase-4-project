"""add users table

Revision ID: 2467a6af4c4e
Revises: 
Create Date: 2024-04-29 14:28:27.449646

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2467a6af4c4e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
