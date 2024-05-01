"""fix constraint

Revision ID: d3a765dee690
Revises: 5774a4668961
Create Date: 2024-04-30 19:27:52.882961

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd3a765dee690'
down_revision = '5774a4668961'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('book_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_reviews_user_id_users'), 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_reviews_book_id_books'), 'books', ['book_id'], ['id'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint('username_constraint', ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint('username_constraint', type_='unique')

    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_reviews_book_id_books'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_reviews_user_id_users'), type_='foreignkey')
        batch_op.drop_column('book_id')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###