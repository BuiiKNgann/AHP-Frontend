from flask import Blueprint, request, jsonify
from models import db, Expert

expert_bp = Blueprint('expert_bp', __name__)

@expert_bp.route('/experts', methods=['POST'])
def create_expert():
    data = request.get_json()
    expert = Expert(name=data['name'])
    db.session.add(expert)
    db.session.commit()
    return jsonify({'message': 'Expert created', 'id': expert.id})

@expert_bp.route('/experts', methods=['GET'])
def get_experts():
    experts = Expert.query.all()
    return jsonify([{'id': e.id, 'name': e.name} for e in experts])
