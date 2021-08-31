"""empty message

Revision ID: bdf2dc2180d8
Revises: ba831649d7be
Create Date: 2020-02-06 20:23:55.350320

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'bdf2dc2180d8'
down_revision = 'ba831649d7be'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('facts_in_johnson_scanner_data',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fact_id', sa.Integer(), nullable=True),
    sa.Column('johnson_scanner_data_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['fact_id'], ['facts.id'], ),
    sa.ForeignKeyConstraint(['johnson_scanner_data_id'], ['johnson_scanner_data.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_constraint('johnson_scanner_data_ibfk_3', 'johnson_scanner_data', type_='foreignkey')
    op.drop_column('johnson_scanner_data', 'fact_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('johnson_scanner_data', sa.Column('fact_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False))
    op.create_foreign_key('johnson_scanner_data_ibfk_3', 'johnson_scanner_data', 'facts', ['fact_id'], ['id'])
    op.drop_table('facts_in_johnson_scanner_data')
    # ### end Alembic commands ###