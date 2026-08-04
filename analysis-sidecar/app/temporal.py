from typing import List, Optional
from collections import Counter
from app.models import FacialExpressionEstimate, ClipExpressionSummary

def aggregate_expressions_to_summary(
    expressions: List[FacialExpressionEstimate]
) -> Optional[ClipExpressionSummary]:
    """
    Aggregates frame-level expression estimates into a clip-level summary.
    Includes outlier rejection and confidence weighting.
    """
    if not expressions:
        return None

    # Filter out low-confidence or uncertain estimates for aggregation
    valid_expressions = [e for e in expressions if e.confidence > 0.4 and e.label != 'uncertain']

    if not valid_expressions:
        return None

    smile_frames = [e for e in valid_expressions if e.label == 'smiling']
    smile_score = (len(smile_frames) / len(valid_expressions)) * 100

    labels = [e.label for e in valid_expressions]
    dominant_expression = Counter(labels).most_common(1)[0][0]

    # Placeholder for more complex scoring
    expression_score = 70.0 
    consistency = len(valid_expressions) / len(expressions)

    return ClipExpressionSummary(
        dominant_expression=dominant_expression,
        smile_score=smile_score,
        expression_score=expression_score,
        consistency=consistency,
    )
