from flask import Blueprint, request, jsonify
from models import db, CriteriaWeight

ahp_bp = Blueprint('ahp_bp', __name__)

@ahp_bp.route('/criteria-weights', methods=['POST'])
def save_criteria_weights():
    data = request.get_json()  # Expects list of weights
    for item in data:
        weight = CriteriaWeight(
            expert_id=item['expert_id'],
            criteria_id=item['criteria_id'],
            weight=item['weight']
        )
        db.session.add(weight)
    db.session.commit()
    return jsonify({'message': 'Weights saved'})
