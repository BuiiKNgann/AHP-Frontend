from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Expert(db.Model):
    __tablename__ = 'experts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Criteria(db.Model):
    __tablename__ = 'criteria'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Alternative(db.Model):
    __tablename__ = 'alternatives'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class AHPMatrix(db.Model):
    __tablename__ = 'ahp_matrices'
    id = db.Column(db.Integer, primary_key=True)
    expert_id = db.Column(db.Integer, db.ForeignKey('experts.id'), nullable=False)
    type = db.Column(db.Enum('criteria', 'alternative'), nullable=False)
    criteria_id = db.Column(db.Integer, db.ForeignKey('criteria.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

class AHPMatrixValue(db.Model):
    __tablename__ = 'ahp_matrix_values'
    id = db.Column(db.Integer, primary_key=True)
    matrix_id = db.Column(db.Integer, db.ForeignKey('ahp_matrices.id'), nullable=False)
    row_index = db.Column(db.Integer, nullable=False)
    col_index = db.Column(db.Integer, nullable=False)
    value = db.Column(db.Float, nullable=False)

class CriteriaWeight(db.Model):
    __tablename__ = 'criteria_weights'
    id = db.Column(db.Integer, primary_key=True)
    expert_id = db.Column(db.Integer, db.ForeignKey('experts.id'), nullable=False)
    criteria_id = db.Column(db.Integer, db.ForeignKey('criteria.id'), nullable=False)
    weight = db.Column(db.Float, nullable=False)

class AlternativeScore(db.Model):
    __tablename__ = 'alternative_scores'
    id = db.Column(db.Integer, primary_key=True)
    expert_id = db.Column(db.Integer, db.ForeignKey('experts.id'), nullable=False)
    criteria_id = db.Column(db.Integer, db.ForeignKey('criteria.id'), nullable=False)
    alternative_id = db.Column(db.Integer, db.ForeignKey('alternatives.id'), nullable=False)
    score = db.Column(db.Float, nullable=False)

class AHPFinalScore(db.Model):
    __tablename__ = 'ahp_final_scores'
    id = db.Column(db.Integer, primary_key=True)
    expert_id = db.Column(db.Integer, db.ForeignKey('experts.id'), nullable=False)
    alternative_id = db.Column(db.Integer, db.ForeignKey('alternatives.id'), nullable=False)
    final_score = db.Column(db.Float, nullable=False)
